import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Box, CircularProgress } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoute';
import './transitions.css';

// Lazy load all pages
const HomePage = lazy(() => import('../pages/HomePage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const AppointmentPage = lazy(() => import('../pages/AppointmentPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('../pages/TermsConditionsPage'));
const AdminLayout = lazy(() => import('../pages/AdminLayout'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const UserManagement = lazy(() => import('../pages/UserManagement'));
const ServiceManagement = lazy(() => import('../pages/ServiceManagement'));
const AppointmentManagement = lazy(() => import('../pages/AppointmentManagement'));
const MessageManagement = lazy(() => import('../pages/MessageManagement'));

// Loading component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress sx={{ color: '#A51C30' }} size={60} />
  </Box>
);

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
          <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="appointments" element={<AppointmentManagement />} />
            <Route path="messages" element={<MessageManagement />} />
          </Route>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Suspense>
  );
};

export default AppRoutes;