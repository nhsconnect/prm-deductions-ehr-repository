import request from 'supertest';
import uuid from 'uuid/v4';
import app from './app';
import getSignedUrl from './services/get-signed-url';

jest.mock('./config/logging');

jest.mock('express-winston', () => ({
  errorLogger: () => (req, res, next) => next(),
  logger: () => (req, res, next) => next()
}));

describe('POST /health-record', () => {
  describe('when running locally', () => {
    it('should return fake url', () => {
      const conversationId = uuid();
      const messageId = uuid();

      return request(app)
        .post(`/health-record/${conversationId}/message`)
        .send({
          messageId
        })
        .then(() => {
          return getSignedUrl(conversationId, messageId).then(url => {
            expect(url).toContain('http://');
            expect(url).toContain(process.env.S3_BUCKET_NAME);
            expect(url).toContain(messageId);
            return expect(url).toContain(conversationId);
          });
        });
    });
  });
});
