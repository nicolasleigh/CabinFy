import auth from './auth.js';
import bookings from './bookings.js';
import cabins from './cabins.js';
import settings from './settings.js';

const mountRoutes = (app: any) => {
  app.use('/api/auth', auth);
  app.use('/api/bookings', bookings);
  app.use('/api/cabins', cabins);
  app.use('/api/settings', settings);
};

export default mountRoutes;
