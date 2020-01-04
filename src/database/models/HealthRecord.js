"use strict";

const modelName = "HealthRecord";

const modelParameters = require("./parameters")("health_records");

const model = (dataType) => ({
  id: {
    type: dataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: dataType.UUID,
    unique: true,
    allowNull: false
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
  completed_at: dataType.DATE
  ,
  deleted_at: dataType.DATE,
  created_at: {
    type: dataType.DATE,
    allowNull: false
  },
  updated_at: {
    type: dataType.DATE,
    allowNull: false
  }
});

module.exports = (sequelize, DataTypes) => {

  const HealthRecord = sequelize.define(modelName, model(DataTypes), modelParameters);

  HealthRecord.associate = function(models) {
    // associations can be defined here

    // ONE to ONE -> Patient
  };

  HealthRecord.complete = (options) => {
    return HealthRecord.update({
      completed_at: new Date()
    }, options);
  };

  return HealthRecord;
};