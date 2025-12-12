import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Locations = () => {
  const locations = [
    {
      city: 'Mumbai',
      tag: 'Main Branch',
      address: '123 Marine Drive, Andheri West, Mumbai - 400058',
      phone: '+91 22 2345 6789',
      hours: '24/7 Emergency Services',
      highlight: true,
    },
    {
      city: 'Chennai',
      address: '45 Anna Salai, T. Nagar, Chennai - 600017',
      phone: '+91 44 2345 6789',
      hours: '24/7 Emergency Services',
    },
    {
      city: 'Delhi',
      address: '78 Janpath Road, Connaught Place, Delhi - 110001',
      phone: '+91 11 2345 6789',
      hours: '24/7 Emergency Services',
    },
    {
      city: 'Kolkata',
      address: '234 Park Street, Salt Lake, Kolkata - 700064',
      phone: '+91 33 2345 6789',
      hours: '24/7 Emergency Services',
    },
    {
      city: 'Bangalore',
      address: '567 MG Road, Indiranagar, Bangalore - 560038',
      phone: '+91 80 2345 6789',
      hours: '24/7 Emergency Services',
    },
    {
      city: 'Madurai',
      address: '89 West Masi Street, Anna Nagar, Madurai - 625020',
      phone: '+91 452 234 5678',
      hours: '24/7 Emergency Services',
    },
    {
      city: 'Nellore',
      address: '12 Gandhi Road, Central, Nellore - 524001',
      phone: '+91 861 234 5678',
      hours: '24/7 Emergency Services',
    },
    {
      city: 'Bhopal',
      address: '345 Bittan Market, MP Nagar, Bhopal - 462011',
      phone: '+91 755 234 5678',
      hours: '24/7 Emergency Services',
    },
    {
      city: 'Kochi',
      address: '67 MG Road, Marine Drive, Kochi - 682031',
      phone: '+91 484 234 5678',
      hours: '24/7 Emergency Services',
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: '#fff',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Viga", sans-serif',
              color: '#A51C30',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Our Locations
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Noto Serif Georgian", serif',
              color: '#666',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            HavenWell Health operates across nine major cities in India, bringing world-class healthcare to communities nationwide. Each facility is equipped with state-of-the-art technology and staffed by experienced medical professionals.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {locations.map((location, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '20px',
                  border: location.highlight ? '3px solid #F0A202' : '1px solid #e0e0e0',
                  boxShadow: location.highlight
                    ? '0 8px 30px rgba(240, 162, 2, 0.2)'
                    : '0 4px 15px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 35px rgba(165, 28, 48, 0.15)',
                  },
                }}
              >
                {location.highlight && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -15,
                      right: 20,
                      bgcolor: '#F0A202',
                      color: '#fff',
                      px: 3,
                      py: 1,
                      borderRadius: '20px',
                      fontFamily: '"Viga", sans-serif',
                      fontSize: '0.85rem',
                      boxShadow: '0 4px 10px rgba(240, 162, 2, 0.3)',
                    }}
                  >
                    {location.tag}
                  </Box>
                )}
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Viga", sans-serif',
                      color: '#A51C30',
                      mb: 2,
                      fontSize: '1.5rem',
                    }}
                  >
                    {location.city}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                    <LocationOnIcon sx={{ color: '#FF7E7E', mt: 0.5, fontSize: '1.3rem' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Noto Serif Georgian", serif',
                        color: '#555',
                        lineHeight: 1.6,
                      }}
                    >
                      {location.address}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <PhoneIcon sx={{ color: '#FF7E7E', fontSize: '1.2rem' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Noto Serif Georgian", serif',
                        color: '#555',
                      }}
                    >
                      {location.phone}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AccessTimeIcon sx={{ color: '#F0A202', fontSize: '1.2rem' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Noto Serif Georgian", serif',
                        color: '#555',
                        fontWeight: 600,
                      }}
                    >
                      {location.hours}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            p: 4,
            bgcolor: '#FF7E7E10',
            borderRadius: '20px',
            border: '2px dashed #FF7E7E',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Viga", sans-serif',
              color: '#A51C30',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Need Assistance Finding a Location?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Noto Serif Georgian", serif',
              color: '#666',
              textAlign: 'center',
              lineHeight: 1.7,
            }}
          >
            Call our helpline at <strong style={{ color: '#F0A202' }}>1800-123-4567</strong> or email us at{' '}
            <strong style={{ color: '#F0A202' }}>info@havenwellhealth.com</strong> for directions and appointment scheduling.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Locations;