import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context";
import { DarkModeProvider } from "./context/DarkModeContext";
import Account from "./pages/Account";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import AppLayout from "./ui/AppLayout";
import GuestLayout from "./features/guests/GuestLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import { Suspense, lazy } from "react";
import Spinner from "./ui/Spinner";
import HomeSkeleton from "./ui/HomeSkeleton";
import CabinSkeleton from "./ui/CabinSkeleton";
import { ThemeProvider } from "./components/theme-provider";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Booking = lazy(() => import("./pages/Booking"));
const Checkin = lazy(() => import("./pages/Checkin"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Cabin = lazy(() => import("./pages/Cabin"));
const Home = lazy(() => import("./pages/Home"));

// export const imageBaseUrl = import.meta.env.VITE_IMAGE_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          {/* <GlobalStyles /> */}
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
          <Toast />
        </QueryClientProvider>
      </ContextProvider>
    </DarkModeProvider>
  );
}

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  return (
    <Routes>
      <Route path='/admin/*' element={<AdminApp />} />
      <Route path='/*' element={<GuestApp />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

function AdminApp() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to='dashboard' />} />
        <Route
          path='dashboard'
          element={
            <Suspense fallback={<Spinner />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path='bookings'
          element={
            <Suspense fallback={<Spinner />}>
              <Bookings />
            </Suspense>
          }
        />
        <Route
          path='bookings/:bookingId'
          element={
            <Suspense fallback={<Spinner />}>
              <Booking />
            </Suspense>
          }
        />
        <Route
          path='checkin/:bookingId'
          element={
            <Suspense fallback={<Spinner />}>
              <Checkin />
            </Suspense>
          }
        />
        <Route
          path='cabins'
          element={
            <Suspense fallback={<Spinner />}>
              <Cabins />
            </Suspense>
          }
        />
        <Route
          path='settings'
          element={
            <Suspense fallback={<Spinner />}>
              <Settings />
            </Suspense>
          }
        />
        <Route
          path='account'
          element={
            <Suspense fallback={<Spinner />}>
              <Account />
            </Suspense>
          }
        />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='reset-password/:uid/:token' element={<ResetPassword />} />
      {/* <Route path='reset-password' element={<ResetPassword />} /> */}
      <Route path='forget-password' element={<ForgetPassword />} />
    </Routes>
  );
}

function GuestApp() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route index element={<Navigate replace to='home' />} />
        <Route
          path='home'
          element={
            <Suspense fallback={<HomeSkeleton />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path='cabin/:cabinId'
          element={
            <Suspense fallback={<CabinSkeleton />}>
              <Cabin />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

const Toast = () => {
  return (
    <Toaster
      position='top-center'
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
    />
  );
};
