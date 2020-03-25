import request from 'supertest';
import app from '../app';
import ModelFactory from '../models';
import { getHealthCheck } from '../services/get-health-check';

jest.mock('../middleware/logging');

jest.mock('../services/storage/get-signed-url', () =>
  jest.fn().mockReturnValue(Promise.resolve('some-url'))
);

jest.mock('../services/get-health-check');

describe('app', () => {
  const conversationId = 'de6d511c-f7d5-4ba5-8584-07fe1c1463da';
  const messageId = 'fdfc5cee-8a9f-44e2-835d-8a786e04d16b';

  afterAll(() => {
    ModelFactory.sequelize.close();
  });

  describe('POST /health-record/{conversationId}/new/message', () => {
    const TEST_ENDPOINT = `/health-record/${conversationId}/new/message`;

    it('should return 201', done => {
      request(app)
        .post(TEST_ENDPOINT)
        .send({
          messageId
        })
        .expect(201)
        .end(done);
    });
  });

  describe('PATCH /health-record/{conversationId}/message/{messageId}', () => {
    const TEST_ENDPOINT = `/health-record/${conversationId}/message/${messageId}`;

    it('should return 204', done => {
      request(app)
        .patch(TEST_ENDPOINT)
        .send({
          transferComplete: true
        })
        .expect(204)
        .end(done);
    });
  });

  describe('GET /', () => {
    it('should return a 404 status code', done => {
      request(app)
        .get('/')
        .expect(404)
        .end(done);
    });
  });

  describe('GET /any-text - an unspecified endpoint', () => {
    it('should return a 404 status code', done => {
      request(app)
        .get('/any-text')
        .expect(404)
        .end(done);
    });
  });

  describe('Swagger Documentation', () => {
    it('GET /swagger - should return a 301 status code (redirect) and text/html content type response', done => {
      request(app)
        .get('/swagger')
        .expect(301)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .end(done);
    });

    it('GET /swagger/index.html - should return a 200 status code and text/html content type response', done => {
      request(app)
        .get('/swagger/index.html')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .end(done);
    });
  });

  describe('GET /health', () => {
    beforeEach(() => {
      getHealthCheck.mockReturnValue(
        Promise.resolve({
          details: {
            filestore: {
              writable: true,
              available: true
            },
            database: {
              writable: true
            }
          }
        })
      );
    });

    it('should return 200', done => {
      request(app)
        .get('/health')
        .expect(200)
        .end(done);
    });

    it('should call health check service', done => {
      request(app)
        .get('/health')
        .expect(() => {
          expect(getHealthCheck).toHaveBeenCalled();
        })
        .end(done);
    });
  });
});
