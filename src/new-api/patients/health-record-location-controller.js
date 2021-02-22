import { param } from 'express-validator';
import {
  getHealthRecordStatus,
  HealthRecordStatus
} from '../../services/database/new-health-record-repository';

export const healthRecordLocationControllerValidation = [
  param('conversationId')
    .isUUID()
    .withMessage("'conversationId' provided is not a UUID"),
  param('nhsNumber')
    .isNumeric()
    .withMessage("'nhsNumber' provided is not numeric")
    .isLength({ min: 10, max: 10 })
    .withMessage("'nhsNumber' provided is not 10 characters")
];

export const healthRecordLocationController = async (req, res) => {
  try {
    const status = await getHealthRecordStatus(req.params.conversationId);
    switch (status) {
      case HealthRecordStatus.COMPLETE:
        res.sendStatus(200);
        break;
      case HealthRecordStatus.PENDING:
        res.sendStatus(404);
        break;
      case HealthRecordStatus.NOT_FOUND:
        res.sendStatus(404);
        break;
    }
  } catch (err) {
    res.sendStatus(503);
  }
};
