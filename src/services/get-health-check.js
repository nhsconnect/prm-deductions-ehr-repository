import { save } from '../storage/s3';
import formattedDate from './getFormattedDate';
import { saveHealthCheck } from '../storage/db';
import { updateLogEvent } from '../middleware/logging';

const getHealthCheck = () => {
  updateLogEvent({
    status: 'Starting health check'
  });
  if (process.env.NODE_ENV === 'local') {
    return Promise.resolve('check locally');
  }
  return Promise.all([save(formattedDate()), saveHealthCheck(formattedDate())]);
};

export default getHealthCheck;