import { param } from 'express-validator';
import {
  getHealthRecordStatus,
  HealthRecordStatus,
} from '../../services/database/health-record-repository';
import { setCurrentSpanAttributes } from '../../config/tracing';

export const healthRecordControllerValidation = [
  param('conversationId').isUUID().withMessage("'conversationId' provided is not a UUID"),
  param('nhsNumber')
    .isNumeric()
    .withMessage("'nhsNumber' provided is not numeric")
    .isLength({ min: 10, max: 10 })
    .withMessage("'nhsNumber' provided is not 10 characters"),
];

export const healthRecordController = async (req, res) => {
  try {
    setCurrentSpanAttributes({ conversationId: req.params.conversationId });

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
