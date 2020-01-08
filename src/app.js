import express from 'express';
import { errorLogger, logger as requestLogger } from 'express-winston';
import swaggerUi from 'swagger-ui-express';
import httpContext from 'async-local-storage';
import * as correlationInfo from './middleware/correlation';
import * as logging from './middleware/logging';
import { options } from './config/logging';
import healthRecord from './api/health-record';
import health from './api/health';
import errorEndpoint from './api/errorEndpoint';
import exception from './api/exception';
import swaggerDocument from './swagger.json';

httpContext.enable();

const app = express();

app.use(express.json());
app.use(correlationInfo.middleware);
app.use(requestLogger(options));

app.use('/health', logging.middleware, health);

app.use('/health-record', logging.middleware, healthRecord);

app.use('/error', logging.middleware, errorEndpoint);

app.use('/exception', logging.middleware, exception);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorLogger(options));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

export default app;
