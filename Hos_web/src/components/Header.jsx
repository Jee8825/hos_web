import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/images/hos_logo.jpg';

const Header = ({ onLoginClick, onSignupClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer when switching to desktop layout
  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/');
    setMobileOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Appointment', path: '/appointment' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Admin', path: '/admin' },
  ];

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: '#fff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                '&:hover': {
                  bgcolor: '#FF7E7E20',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiTypography-root': {
                    fontFamily: '"Viga", sans-serif',
                    color: '#A51C30',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText
                  primary="Logout"
                  sx={{
                    '& .MuiTypography-root': {
                      fontFamily: '"Viga", sans-serif',
                      color: '#A51C30',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  onLoginClick();
                  handleDrawerToggle();
                }}
              >
                <ListItemText
                  primary="Login"
                  sx={{
                    '& .MuiTypography-root': {
                      fontFamily: '"Viga", sans-serif',
                      color: '#A51C30',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  onSignupClick();
                  handleDrawerToggle();
                }}
              >
                <ListItemText
                  primary="Sign Up"
                  sx={{
                    '& .MuiTypography-root': {
                      fontFamily: '"Viga", sans-serif',
                      color: '#A51C30',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: scrolled ? 'rgba(255, 255, 255, 0.98)' : '#fff',
          boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(165, 28, 48, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1.5, md: 2 } }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src={logo}
                alt="HavenWell Health Logo"
                sx={{
                  height: { xs: 65, sm: 75, md: 85, lg: 95 },
                  width: 'auto',
                  maxWidth: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                  borderRadius: '8px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  '&:hover': {
                    transform: 'scale(1.06)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                  },
                }}
              />
            </Link>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: (theme) => theme.palette.primary.main }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: '#A51C30',
                      fontFamily: '"Viga", sans-serif',
                      fontSize: '0.95rem',
                      px: 2,
                      py: 1,
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: '#FF7E7E20',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                {isLoggedIn ? (
                  <>
                    <Box
                      sx={{
                        color: '#F0A202',
                        fontFamily: '"Noto Serif Georgian", serif',
                        fontSize: '0.85rem',
                        px: 2,
                      }}
                    >
                      {userEmail}
                    </Box>
                    <Button
                      onClick={handleLogout}
                      sx={{
                        bgcolor: '#A51C30',
                        color: '#fff',
                        fontFamily: '"Viga", sans-serif',
                        px: 3,
                        py: 1,
                        borderRadius: '25px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#8B1628',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(165, 28, 48, 0.3)',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={onLoginClick}
                      sx={{
                        color: '#A51C30',
                        fontFamily: '"Viga", sans-serif',
                        px: 3,
                        py: 1,
                        borderRadius: '25px',
                        border: '2px solid #A51C30',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#A51C30',
                          color: '#fff',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={onSignupClick}
                      sx={{
                        bgcolor: '#F0A202',
                        color: '#fff',
                        fontFamily: '"Viga", sans-serif',
                        px: 3,
                        py: 1,
                        borderRadius: '25px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#D89002',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(240, 162, 2, 0.3)',
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Toolbar />
    </>
  );
};

export default Header;