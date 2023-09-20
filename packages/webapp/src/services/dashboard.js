import { BASE_URL } from 'src/components/Common';
import { get, put, post, destroy } from './defaults';

export const getStats = (body = {}) => {
  return get(`${BASE_URL}/api/dashboard/stats`);
};
