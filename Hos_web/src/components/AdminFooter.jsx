import { Box, Typography } from '@mui/material';

const AdminFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#A51C30',
        color: '#fff',
        py: { xs: 1.5, md: 2 },
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: '"Noto Serif Georgian", serif',
          fontSize: { xs: '0.75rem', md: '0.875rem' },
        }}
      >
        © 2024 HavenWell Health. All rights reserved.
      </Typography>
    </Box>
  );
};

export default AdminFooter;
