import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/images/hos_logo.jpg';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: '2px solid #A51C30',
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1.5, md: 2 }, px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, cursor: 'pointer' }} onClick={handleLogoClick}>
          <Box
            component="img"
            src={logo}
            alt="HavenWell Health"
            sx={{
              height: { xs: 65, sm: 75, md: 85, lg: 95 },
              width: 'auto',
              maxWidth: '100%',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Viga", sans-serif',
              color: '#A51C30',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>HavenWell Health - Admin</Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Admin</Box>
          </Typography>
        </Box>

        <Button
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            bgcolor: '#A51C30',
            color: '#fff',
            fontFamily: '"Viga", sans-serif',
            px: { xs: 2, md: 3 },
            py: { xs: 0.75, md: 1 },
            borderRadius: '25px',
            fontSize: { xs: '0.875rem', md: '1rem' },
            minWidth: { xs: 'auto', md: 'auto' },
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
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
