import request from 'supertest';
import { v4 as uuid } from 'uuid';
import app from '../../../app';
import {
  getCurrentHealthRecordIdForPatient,
  getHealthRecordMessageIds
} from '../../../services/database/new-health-record-repository';
import { logError, logEvent } from '../../../middleware/logging';

jest.mock('../../../services/database/new-health-record-repository');
jest.mock('../../../middleware/logging');

describe('patientDetailsController', () => {
  const authorizationKeys = 'correct-key';

  beforeEach(() => {
    process.env.AUTHORIZATION_KEYS = authorizationKeys;
  });

  afterEach(() => {
    if (process.env.AUTHORIZATION_KEYS) {
      delete process.env.AUTHORIZATION_KEYS;
    }
  });

  describe('success', () => {
    it('should return 200 and correct link to health record extract given a small record', async () => {
      const nhsNumber = '1234567890';
      const conversationId = uuid();
      const messageId = uuid();
      const serviceUrl = process.env.SERVICE_URL;

      getCurrentHealthRecordIdForPatient.mockResolvedValue(conversationId);
      getHealthRecordMessageIds.mockResolvedValue({
        healthRecordExtractId: messageId,
        attachmentIds: []
      });

      const res = await request(app)
        .get(`/new/patients/${nhsNumber}`)
        .set('Authorization', authorizationKeys);

      expect(res.status).toBe(200);
      expect(getCurrentHealthRecordIdForPatient).toHaveBeenCalledWith(nhsNumber);
      expect(res.body.data.id).toEqual(nhsNumber);
      expect(res.body.data.type).toEqual('patients');
      expect(res.body.data.links.healthRecordExtract).toEqual(
        `${serviceUrl}/messages/${conversationId}/${messageId}`
      );
      expect(res.body.data.links.attachments).toEqual([]);
    });

    it('should return 200 and correct link to health record extract and attachment', async () => {
      const nhsNumber = '1234567890';
      const conversationId = uuid();
      const healthRecordExtractId = uuid();
      const attachmentId = uuid();
      const endpointUrl = `${process.env.SERVICE_URL}/messages`;

      getCurrentHealthRecordIdForPatient.mockResolvedValue(conversationId);
      getHealthRecordMessageIds.mockResolvedValue({
        healthRecordExtractId: healthRecordExtractId,
        attachmentIds: [attachmentId]
      });

      const res = await request(app)
        .get(`/new/patients/${nhsNumber}`)
        .set('Authorization', authorizationKeys);

      expect(res.status).toBe(200);
      expect(getCurrentHealthRecordIdForPatient).toHaveBeenCalledWith(nhsNumber);
      expect(res.body.data.links.healthRecordExtract).toEqual(
        `${endpointUrl}/${conversationId}/${healthRecordExtractId}`
      );
      expect(res.body.data.links.attachments).toEqual([
        `${endpointUrl}/${conversationId}/${attachmentId}`
      ]);
    });
  });

  describe('failure', () => {
    const nhsNumber = '1234567890';

    it('should return a 404 when no complete health record is found', async () => {
      getCurrentHealthRecordIdForPatient.mockReturnValue(undefined);
      const res = await request(app)
        .get(`/new/patients/${nhsNumber}`)
        .set('Authorization', authorizationKeys);

      expect(res.status).toEqual(404);
      expect(logEvent).toHaveBeenCalledWith('Did not find a complete patient health record');
    });

    it('should return a 503 when cannot get patient health record from database', async () => {
      getCurrentHealthRecordIdForPatient.mockRejectedValue({});
      const res = await request(app)
        .get(`/new/patients/${nhsNumber}`)
        .set('Authorization', authorizationKeys);

      expect(res.status).toEqual(503);
      expect(logError).toHaveBeenCalledWith('Could not retrieve patient health record', {});
    });
  });

  describe('authentication', () => {
    it('should return 401 when authentication keys are missing', async () => {
      const nhsNumber = '1234567890';
      const res = await request(app).get(`/new/patients/${nhsNumber}`);

      expect(res.status).toBe(401);
    });

    it('should return 403 when authentication keys are incorrect', async () => {
      const nhsNumber = '1234567890';
      const res = await request(app)
        .get(`/new/patients/${nhsNumber}`)
        .set('Authorization', 'incorrect');

      expect(res.status).toBe(403);
    });
  });

  describe('validation', () => {
    it('should return 422 and an error message when nhsNumber is not numeric', async () => {
      const nhsNumber = 'not-valid';
      const errorMessage = { nhsNumber: "'nhsNumber' provided is not numeric" };

      const res = await request(app)
        .get(`/new/patients/${nhsNumber}`)
        .set('Authorization', authorizationKeys);

      expect(res.status).toBe(422);
      expect(res.body.errors).toContainEqual(errorMessage);
    });

    it('should return 422 and an error message when nhsNumber is not 10 characters', async () => {
      const nhsNumber = '123';
      const errorMessage = { nhsNumber: "'nhsNumber' provided is not 10 characters" };

      const res = await request(app)
        .get(`/new/patients/${nhsNumber}`)
        .set('Authorization', authorizationKeys);

      expect(res.status).toBe(422);
      expect(res.body.errors).toContainEqual(errorMessage);
    });
  });
});
