import { useState } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader />
      
      <Box sx={{ display: 'flex', flexGrow: 1, mt: { xs: '90px', md: '110px' } }}>
        <AdminSidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            width: { xs: '100%', md: `calc(100% - 260px)` },
            bgcolor: '#F9F9F9',
            minHeight: { xs: 'calc(100vh - 90px)', md: 'calc(100vh - 110px)' },
          }}
        >
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                mb: 2,
                bgcolor: '#A51C30',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(165, 28, 48, 0.3)',
                '&:hover': { bgcolor: '#8B1628' },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Outlet />
        </Box>
      </Box>
      
      <AdminFooter />
    </Box>
  );
};

export default AdminLayout;
