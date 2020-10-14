import uuid from 'uuid/v4';
import ModelFactory from '../../index';

jest.mock('uuid/v4');

describe('Patient - HealthRecord associations', () => {
  const existingPatientNHSNumber = '1111111111';
  const existingPatientUUID = 'e479ca12-4a7d-41cb-86a2-775f36b8a0d1';

  const testNHSNumber = '8245367828';
  const testUUID = '94c6131a-2111-3252-b015-4953a82ed734';

  const HealthRecord = ModelFactory.getByName('HealthRecord');
  const Patient = ModelFactory.getByName('Patient');
  const sequelize = ModelFactory.sequelize;

  const firstPatientUUID = 'e479ca12-4a7d-41cb-86a2-775f36b8a0d1';
  const firstPatientNHSNumber = '1111111111';
  const firstHealthRecordConvoId = '8ab7f61f-0e6b-4378-8cac-dcb4f9e3ec54';

  const secondPatientUUID = 'd126ee7f-035e-4938-8996-09a28c2ba61c';
  const secondPatientNHSNumber = '2222222222';
  const secondHealthRecordConvoId1 = '3244a7bb-555e-433b-b2cc-1aa8178da99e';
  const secondHealthRecordConvoId2 = '10489310-e97b-4744-8f3d-b7af1c47596d';

  beforeEach(() => {
    uuid.mockImplementation(() => testUUID);
  });

  afterAll(() => {
    sequelize.close();
  });

  it('should get the patient from the health record (single)', () => {
    const healthRecordConversationId = { conversation_id: firstHealthRecordConvoId };

    return sequelize.transaction().then(t =>
      HealthRecord.findOne({ ...where(healthRecordConversationId), transaction: t })
        .then(healthRecord =>
          healthRecord.getPatient({ transaction: t }).then(patient => {
            expect(patient.get().id).toBe(firstPatientUUID);
            return expect(patient.get().nhs_number).toBe(firstPatientNHSNumber);
          })
        )
        .finally(() => t.rollback())
    );
  });

  it('should get both health records for the patient', () => {
    const patientNhsNumber = { nhs_number: secondPatientNHSNumber };

    return sequelize.transaction().then(t =>
      Patient.findOne({ ...where(patientNhsNumber), transaction: t })
        .then(patient => {
          expect(patient.get().id).toBe(secondPatientUUID);
          return patient.getHealthRecords({ transaction: t }).then(healthRecords => {
            const conversationIds = [
              healthRecords[0].get().conversation_id,
              healthRecords[1].get().conversation_id
            ];
            expect(healthRecords.length).toBe(2);
            expect(conversationIds).toContain(secondHealthRecordConvoId1);
            return expect(conversationIds).toContain(secondHealthRecordConvoId2);
          });
        })
        .finally(() => t.rollback())
    );
  });

  it('should create new patient and associate with new health record', () => {
    const patientNhsNumber = { nhs_number: testNHSNumber };
    const newHealthRecord = { conversation_id: testUUID };

    return sequelize.transaction().then(t =>
      Patient.findOrCreate({ ...where(patientNhsNumber), transaction: t })
        .then(patient =>
          HealthRecord.create(newHealthRecord, { transaction: t }).then(healthRecord => {
            healthRecord.setPatient(patient[0].id, { transaction: t });
            return expect(healthRecord.get().patient_id).toBe(testUUID);
          })
        )
        .finally(() => t.rollback())
    );
  });

  it('should find existing patient and associate with new health record', () => {
    const patientNhsNumber = { nhs_number: existingPatientNHSNumber };
    const newHealthRecord = { conversation_id: testUUID };

    return sequelize.transaction().then(t =>
      Patient.findOrCreate({ ...where(patientNhsNumber), transaction: t })
        .then(patient =>
          HealthRecord.create(newHealthRecord, { transaction: t }).then(health => {
            health.setPatient(patient[0].id, { transaction: t });
            return expect(health.get().patient_id).toBe(existingPatientUUID);
          })
        )
        .finally(() => t.rollback())
    );
  });
});

const where = body => {
  return {
    where: body
  };
};
