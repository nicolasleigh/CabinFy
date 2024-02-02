import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';
import GuestList from './features/guests/GuestList';
import CreateGuestForm from './features/guests/CreateGuestForm';
import Logup from './pages/Signup';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ForgetPassword from './pages/ForgetPassword';
import Home from './pages/Home';
import GuestLayout from './ui/GuestLayout';
import Cabin from './pages/Cabin';
import GuestSignup from './pages/GuestSignup';
import { ContextProvider } from './context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export const imageBaseUrl = import.meta.env.VITE_IMAGE_URL;

function App() {
  return (
    <DarkModeProvider>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                path='/admin'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to='dashboard' />} />
                {/* <Route index element={<Dashboard />} /> */}
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='bookings' element={<Bookings />} />
                <Route path='bookings/:bookingId' element={<Booking />} />
                <Route path='checkin/:bookingId' element={<Checkin />} />
                <Route path='cabins' element={<Cabins />} />
                {/* <Route path='users' element={<Users />} /> */}
                <Route path='settings' element={<Settings />} />
                <Route path='account' element={<Account />} />
                <Route path='guests' element={<CreateGuestForm />} />
                {/* <Route path='guests' element={<GuestList />} /> */}
              </Route>
              <Route path='/admin/login' element={<Login />} />
              <Route path='/admin/signup' element={<Signup />} />
              <Route
                path='/admin/reset-password/:uid/:token'
                element={<ResetPassword />}
              />
              <Route
                path='/admin/forget-password'
                element={<ForgetPassword />}
              />

              <Route path='/' element={<GuestLayout />}>
                <Route index element={<Navigate replace to='home' />} />
                <Route path='home' element={<Home />} />
                <Route path='cabin/:cabinId' element={<Cabin />} />
                {/* <Route path='signup' element={<GuestSignup />} /> */}
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position='top-center'
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'var(--color-grey-0)',
                color: 'var(--color-grey-700)',
              },
            }}
          />
        </QueryClientProvider>
      </ContextProvider>
    </DarkModeProvider>
  );
}

export default App;
