import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';

const AdminSidebar = ({ mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: 'Dashboard Overview', path: '/admin', icon: <AssessmentIcon /> },
    { label: 'User Management', path: '/admin/users', icon: <PeopleIcon /> },
    { label: 'Service Management', path: '/admin/services', icon: <MedicalServicesIcon /> },
    { label: 'Appointment Management', path: '/admin/appointments', icon: <CalendarMonthIcon /> },
    { label: 'Contact Messages', path: '/admin/messages', icon: <MessageIcon /> },
    { label: 'Back to Home Page', path: '/', icon: <HomeIcon /> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onDrawerToggle();
    }
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname === path;
  };

  const drawerContent = (
    <Box sx={{ width: { xs: 240, md: 260 }, pt: 2 }}>
      <List>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: '12px',
                  bgcolor: active ? '#FF7E7E20' : 'transparent',
                  '&:hover': {
                    bgcolor: '#FF7E7E30',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ListItemIcon sx={{ color: active ? '#A51C30' : '#666', minWidth: { xs: 36, md: 40 } }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontFamily: '"Viga", sans-serif',
                      color: active ? '#A51C30' : '#666',
                      fontWeight: active ? 600 : 400,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: { xs: 240, md: 260 },
              bgcolor: '#fff',
              borderRight: '2px solid #FF7E7E20',
              mt: { xs: '60px', md: '70px' },
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: { md: 260 },
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: { md: 260 },
              boxSizing: 'border-box',
              bgcolor: '#fff',
              borderRight: '2px solid #FF7E7E20',
              top: '110px',
              height: 'calc(100vh - 110px)',
              overflowY: 'auto',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default AdminSidebar;
