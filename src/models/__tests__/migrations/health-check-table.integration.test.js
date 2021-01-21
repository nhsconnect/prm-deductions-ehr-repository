import { v4 } from 'uuid';
import ModelFactory from '../../index';
import { modelName } from '../../health-check';

jest.mock('uuid', () => ({
  v4: () => '74c6230b-36d9-4940-bdd6-495ba87ed634'
}));

describe('models.HealthCheck', () => {
  const HealthCheck = ModelFactory.getByName(modelName);
  const sequelize = ModelFactory.sequelize;
  const testUUID = v4();
  const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  afterAll(() => {
    sequelize.close();
  });

  it('should return id as a valid uuid', () => {
    return HealthCheck.findOne().then(healthChecks =>
      expect(healthChecks.get().id).toMatch(uuidPattern)
    );
  });

  it('should return Date object for created_at', () => {
    return HealthCheck.findOne().then(healthChecks =>
      expect(typeof healthChecks.get().created_at).toBe(typeof new Date())
    );
  });

  it('should return Date object for updated_at', () => {
    return HealthCheck.findOne().then(healthChecks =>
      expect(typeof healthChecks.get().updated_at).toBe(typeof new Date())
    );
  });

  it('should return null for deleted_at', () => {
    return HealthCheck.findOne().then(healthChecks =>
      expect(healthChecks.get().deleted_at).toBe(null)
    );
  });

  it('should automatically created the id when a record is created', () => {
    return sequelize.transaction().then(t =>
      HealthCheck.create({}, { transaction: t })
        .then(value => expect(value.get().id).toBe(testUUID))
        .finally(() => t.rollback())
    );
  });
});
