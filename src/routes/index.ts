import auth from './auth';
import bookings from './bookings';
import cabins from './cabins';
import settings from './settings';

const mountRoutes = (app: any) => {
  app.use('/api/auth', auth);
  app.use('/api/bookings', bookings);
  app.use('/api/cabins', cabins);
  app.use('/api/settings', settings);
};

export default mountRoutes;
