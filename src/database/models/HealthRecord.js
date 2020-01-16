import getParameters from './parameters';

const modelName = 'HealthRecord';
const tableName = 'health_records';

const model = dataType => ({
  id: {
    type: dataType.UUID,
    primaryKey: true
  },
  patient_id: {
    type: dataType.INTEGER,
    allowNull: false
  },
  conversation_id: {
    type: dataType.STRING(100),
    unique: true,
    allowNull: false
  },
  completed_at: dataType.DATE,
  deleted_at: dataType.DATE,
  created_at: {
    type: dataType.DATE,
    allowNull: false
  },
  updated_at: {
    type: dataType.DATE,
    allowNull: false
  },
  is_completed: {
    type: dataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = (sequelize, DataTypes) => {
  const HealthRecord = sequelize.define(modelName, model(DataTypes), getParameters(tableName));

  HealthRecord.complete = options => {
    return HealthRecord.update(
      {
        completed_at: new Date()
      },
      options
    );
  };

  return HealthRecord;
};
