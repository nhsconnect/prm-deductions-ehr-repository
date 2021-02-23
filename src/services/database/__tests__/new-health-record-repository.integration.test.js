import { v4 as uuid } from 'uuid';
import {
  getHealthRecordStatus,
  updateHealthRecordCompleteness,
  HealthRecordStatus,
  getCurrentHealthRecordIdForPatient,
  getHealthRecordMessageIds
} from '../new-health-record-repository';
import ModelFactory from '../../../models';
import { modelName as healthRecordModelName } from '../../../models/health-record-new';
import { MessageType, modelName as messageModelName } from '../../../models/message';
import { logError } from '../../../middleware/logging';

jest.mock('../../../middleware/logging');

describe('healthRecordRepository', () => {
  const HealthRecord = ModelFactory.getByName(healthRecordModelName);
  const Message = ModelFactory.getByName(messageModelName);

  afterAll(async () => {
    await ModelFactory.sequelize.close();
  });

  describe('getHealthRecordStatus', () => {
    it("should return status 'complete' when health record 'completedAt' field is not null", async () => {
      const conversationId = uuid();
      const nhsNumber = '1234567890';

      await HealthRecord.create({ conversationId, nhsNumber, completedAt: new Date() });
      const status = await getHealthRecordStatus(conversationId);

      expect(status).toEqual(HealthRecordStatus.COMPLETE);
    });

    it("should return status 'pending' when health record 'completedAt' field is null", async () => {
      const conversationId = uuid();
      const nhsNumber = '1234567890';

      await HealthRecord.create({ conversationId, nhsNumber, completedAt: null });
      const status = await getHealthRecordStatus(conversationId);

      expect(status).toEqual(HealthRecordStatus.PENDING);
    });

    it("should return status 'notFound' when health record is not found", async () => {
      const conversationId = uuid();
      const status = await getHealthRecordStatus(conversationId);

      expect(status).toEqual(HealthRecordStatus.NOT_FOUND);
    });

    it('should throw error if there is a problem retrieving health record from database', async () => {
      const conversationId = 'not-a-uuid';

      let caughtException = null;
      try {
        await getHealthRecordStatus(conversationId);
      } catch (e) {
        caughtException = e;
      }
      expect(caughtException).not.toBeNull();
      expect(logError).toHaveBeenCalledWith(
        'Health Record could not be retrieved from database',
        caughtException
      );
    });
  });

  describe('updateHealthRecordCompleteness', () => {
    it("should set 'completedAt' property for a small health record", async () => {
      const conversationId = uuid();
      const messageId = uuid();
      const nhsNumber = '1234567890';

      await HealthRecord.create({ conversationId, nhsNumber, completedAt: null });
      await Message.create({
        conversationId,
        messageId,
        type: MessageType.EHR_EXTRACT,
        receivedAt: new Date()
      });

      await updateHealthRecordCompleteness(conversationId);
      const healthRecord = await HealthRecord.findByPk(conversationId);

      expect(healthRecord.completedAt).not.toBeNull();
    });

    it("should not set 'completedAt' property when there are still messages to be received", async () => {
      const conversationId = uuid();
      const messageId = uuid();
      const attachmentId = uuid();
      const nhsNumber = '1234567890';

      await HealthRecord.create({ conversationId, nhsNumber, completedAt: null });
      await Message.create({
        conversationId,
        messageId,
        type: MessageType.EHR_EXTRACT,
        receivedAt: new Date()
      });
      await Message.create({
        conversationId,
        messageId: attachmentId,
        type: MessageType.ATTACHMENT,
        receivedAt: null
      });

      await updateHealthRecordCompleteness(conversationId);
      const healthRecord = await HealthRecord.findByPk(conversationId);

      expect(healthRecord.completedAt).toBeNull();
    });

    it('should throw an error when database query fails', async () => {
      const conversationId = 'not-valid';

      let caughtException = null;
      try {
        await updateHealthRecordCompleteness(conversationId);
      } catch (e) {
        caughtException = e;
      }
      expect(caughtException).not.toBeNull();
      expect(logError).toHaveBeenCalledWith(
        'Failed to update health record completeness',
        caughtException
      );
    });
  });

  describe('getCurrentHealthRecordIdForPatient', () => {
    it('should return most recent complete health record conversation id', async () => {
      const nhsNumber = '9876543210';
      const previousHealthRecordConversationId = uuid();
      const incompleteHealthRecordConversationId = uuid();
      const currentHealthRecordConversationId = uuid();

      await HealthRecord.create({
        conversationId: previousHealthRecordConversationId,
        nhsNumber,
        completedAt: new Date()
      });
      await HealthRecord.create({
        conversationId: incompleteHealthRecordConversationId,
        nhsNumber,
        completedAt: null
      });
      await HealthRecord.create({
        conversationId: currentHealthRecordConversationId,
        nhsNumber,
        completedAt: new Date()
      });

      const currentHealthRecordId = await getCurrentHealthRecordIdForPatient(nhsNumber);

      expect(currentHealthRecordId).toEqual(currentHealthRecordConversationId);
    });
  });

  describe('getHealthRecordExtractMessageId', () => {
    it('should return health record extract message id given a conversation id for a small health record', async () => {
      const messageId = uuid();
      const conversationId = uuid();

      await Message.create({
        messageId,
        conversationId,
        type: MessageType.EHR_EXTRACT,
        receivedAt: new Date()
      });
      const { healthRecordExtractId, attachmentIds } = await getHealthRecordMessageIds(
        conversationId
      );

      expect(healthRecordExtractId).toEqual(messageId);
      expect(attachmentIds).toEqual([]);
    });

    it('should return health record extract message id and attachment ids given small attachment', async () => {
      const messageId = uuid();
      const conversationId = uuid();
      const attachmentId = uuid();

      await Message.create({
        messageId,
        conversationId,
        type: MessageType.EHR_EXTRACT,
        receivedAt: new Date()
      });

      await Message.create({
        messageId: attachmentId,
        conversationId,
        type: MessageType.ATTACHMENT,
        receivedAt: new Date(),
        parentId: messageId
      });
      const { healthRecordExtractId, attachmentIds } = await getHealthRecordMessageIds(
        conversationId
      );

      expect(healthRecordExtractId).toEqual(messageId);
      expect(attachmentIds).toEqual([attachmentId]);
    });

    it('should return health record extract message id and attachment ids given large attachment', async () => {
      const messageId = uuid();
      const conversationId = uuid();
      const attachmentId = uuid();
      const attachmentPartId = uuid();

      await Message.create({
        messageId,
        conversationId,
        type: MessageType.EHR_EXTRACT,
        receivedAt: new Date()
      });

      await Message.create({
        messageId: attachmentId,
        conversationId,
        type: MessageType.ATTACHMENT,
        receivedAt: new Date(),
        parentId: messageId
      });

      await Message.create({
        messageId: attachmentPartId,
        conversationId,
        type: MessageType.ATTACHMENT,
        receivedAt: new Date(),
        parentId: attachmentId
      });

      const { healthRecordExtractId, attachmentIds } = await getHealthRecordMessageIds(
        conversationId
      );

      expect(healthRecordExtractId).toEqual(messageId);
      expect(attachmentIds).toEqual([attachmentId, attachmentPartId]);
    });
  });
});
