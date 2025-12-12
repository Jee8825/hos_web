import { Box, Container, Grid, Typography, Link as MuiLink, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from '../assets/images/hos_logo.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = ({ onSignupClick }) => {
  const branches = [
    { name: 'Mumbai (Main Branch)', location: 'Andheri West, Mumbai' },
    { name: 'Chennai', location: 'T. Nagar, Chennai' },
    { name: 'Delhi', location: 'Connaught Place, Delhi' },
    { name: 'Kolkata', location: 'Salt Lake, Kolkata' },
    { name: 'Bangalore', location: 'Indiranagar, Bangalore' },
    { name: 'Madurai', location: 'Anna Nagar, Madurai' },
    { name: 'Nellore', location: 'Central, Nellore' },
    { name: 'Bhopal', location: 'MP Nagar, Bhopal' },
    { name: 'Kochi', location: 'Marine Drive, Kochi' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Appointment', path: '/appointment' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-conditions' },
    { name: 'FAQs', path: '/#faqs' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#A51C30',
        color: '#fff',
        pt: 6,
        pb: 3,
        mt: 8,
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* About Section - ADDED textAlign: { xs: 'center', md: 'left' } */}
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ mb: 2 }}>
              <Box
                component="img"
                src={logo}
                alt="HavenWell Health"
                sx={{
                  height: 60,
                  width: 'auto',
                  borderRadius: '8px',
                  mb: 2,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  mx: { xs: 'auto', md: 'unset' } // Centered image on mobile
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Viga", sans-serif',
                  mb: 1,
                  color: '#F0A202',
                }}
              >
                HavenWell Health
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  lineHeight: 1.7,
                  opacity: 0.9,
                }}
              >
                Compassionate care with cutting-edge medical excellence. Your health, our priority since 1985.
              </Typography>
            </Box>
            {/* Centering the icons on mobile */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <IconButton
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { bgcolor: '#F0A202' },
                  transition: 'all 0.3s ease',
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { bgcolor: '#F0A202' },
                  transition: 'all 0.3s ease',
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { bgcolor: '#F0A202' },
                  transition: 'all 0.3s ease',
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { bgcolor: '#F0A202' },
                  transition: 'all 0.3s ease',
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links - ADDED textAlign: { xs: 'center', md: 'left' } */}
          <Grid item xs={12} sm={6} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Viga", sans-serif',
                mb: 2,
                color: '#F0A202',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: { xs: 'center', md: 'flex-start' } }}>
              {quickLinks.map((link) => (
                <MuiLink
                  key={link.name}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: '"Noto Serif Georgian", serif',
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      color: '#FF7E7E',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Our Branches - ADDED textAlign: { xs: 'center', md: 'left' } */}
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Viga", sans-serif',
                mb: 2,
                color: '#F0A202',
              }}
            >
              Our Branches
            </Typography>
            {/* Centering the branch list items on mobile */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: { xs: 'center', md: 'flex-start' } }}>
              {branches.slice(0, 6).map((branch) => (
                <Box key={branch.name} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: '1rem', mt: 0.3, color: '#FF7E7E', flexShrink: 0 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Noto Serif Georgian", serif',
                      fontSize: '0.85rem',
                      opacity: 0.9,
                    }}
                  >
                    {branch.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Info - ADDED textAlign: { xs: 'center', md: 'left' } */}
          <Grid item xs={12} sm={6} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Viga", sans-serif',
                mb: 2,
                color: '#F0A202',
              }}
            >
              Contact Us
            </Typography>
            {/* Centering the contact items on mobile */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#FF7E7E', fontSize: '1.2rem', flexShrink: 0 }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Noto Serif Georgian", serif',
                    fontSize: '0.9rem',
                  }}
                >
                  +91 1800-123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#FF7E7E', fontSize: '1.2rem', flexShrink: 0 }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Noto Serif Georgian", serif',
                    fontSize: '0.9rem',
                  }}
                >
                  info@havenwellhealth.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#FF7E7E', fontSize: '1.2rem', flexShrink: 0 }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Noto Serif Georgian", serif',
                    fontSize: '0.9rem',
                  }}
                >
                  Mumbai, India
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Legal Links - ADDED textAlign: { xs: 'center', md: 'left' } */}
          <Grid item xs={12} sm={6} md={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Viga", sans-serif',
                mb: 2,
                color: '#F0A202',
              }}
            >
              Legal
            </Typography>
            {/* Centering the link list items on mobile */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: { xs: 'center', md: 'flex-start' } }}>
              {legalLinks.map((link) => (
                <MuiLink
                  key={link.name}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: '"Noto Serif Georgian", serif',
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      color: '#FF7E7E',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            textAlign: { xs: 'center', md: 'left' } // Ensures copyright text is centered on mobile
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Noto Serif Georgian", serif',
              opacity: 0.8,
            }}
          >
            © 2024 HavenWell Health. All rights reserved.
          </Typography>
          <Box
            onClick={onSignupClick}
            sx={{
              bgcolor: '#F0A202',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: '30px',
              fontFamily: '"Viga", sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(240, 162, 2, 0.3)',
              '&:hover': {
                bgcolor: '#D89002',
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 20px rgba(240, 162, 2, 0.4)',
              },
            }}
          >
            Register Now
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;