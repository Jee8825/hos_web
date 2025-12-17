import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import socketService from './services/socket';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './router/AppRoutes';
import LoginSignup from './components/LoginSignup';
import BackToTop from './components/BackToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './context/AuthContext';
import './App.css';
import './styles/glowEffects.css';
import './styles/pageAnimations.css';
import './styles/interactiveEffects.css';
import './styles/adminStyles.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A51C30',
    },
    secondary: {
      main: '#F0A202',
    },
    error: {
      main: '#FF7E7E',
    },
  },
  typography: {
    fontFamily: '"Noto Serif Georgian", serif',
  },
});

const AppContent = ({ onLoginClick, onSignupClick }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {!isAdminRoute && <Header onLoginClick={onLoginClick} onSignupClick={onSignupClick} />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppRoutes />
      </Box>
      {!isAdminRoute && <Footer onSignupClick={onSignupClick} />}
      {!isAdminRoute && <BackToTop />}
    </Box>
  );
};

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    socketService.connect();
    
    // Keep backend alive on Render free tier (pings every 14 minutes)
    const keepAlive = setInterval(async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL?.replace('/api', '')}/api/health`);
      } catch (error) {
        console.log('Keep-alive ping failed');
      }
    }, 14 * 60 * 1000);
    
    return () => {
      socketService.disconnect();
      clearInterval(keepAlive);
    };
  }, []);

  const handleLoginOpen = () => {
    setIsLoginMode(true);
    setDialogOpen(true);
  };

  const handleSignupOpen = () => {
    setIsLoginMode(false);
    setDialogOpen(true);
  };

  const handleCloseAndRefresh = () => {
    setDialogOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
        <AppContent onLoginClick={handleLoginOpen} onSignupClick={handleSignupOpen} />
        
        {/* Login/Signup Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          disableRestoreFocus
          PaperProps={{
            sx: {
              borderRadius: '25px',
              position: 'relative',
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#A51C30',
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{ p: 0 }}>
            <LoginSignup
              isLogin={isLoginMode}
              onSwitchToLogin={() => setIsLoginMode(true)}
              onSwitchToSignup={() => setIsLoginMode(false)}
              onClose={handleClose}
            />
          </DialogContent>
        </Dialog>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;