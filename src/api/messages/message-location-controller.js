import { getSignedUrl } from '../../services/storage';
import { param } from 'express-validator';
import { logError, logInfo } from '../../middleware/logging';
import { setCurrentSpanAttributes } from '../../config/tracing';

export const messageLocationControllerValidation = [
  param('conversationId').isUUID().withMessage("'conversationId' provided is not a UUID"),
  param('messageId').isUUID().withMessage("'messageId' provided is not a UUID"),
];

export const messageLocationController = async (req, res) => {
  const { conversationId, messageId } = req.params;
  setCurrentSpanAttributes({ conversationId, messageId });
  const operation = 'putObject';

  try {
    const presignedUrl = await getSignedUrl(conversationId, messageId, operation);
    res.status(200).send(presignedUrl);
    logInfo('Presigned URL sent successfully');
  } catch (err) {
    logError('Failed to retrieve pre-signed url', err);
    res.sendStatus(503);
  }
};
