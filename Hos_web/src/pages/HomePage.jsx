import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import banner from '../assets/images/hos_banner.jpg';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import ApartmentIcon from '@mui/icons-material/Apartment';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
// Removed unused PhoneIcon and EmailIcon imports
// import PhoneIcon from '@mui/icons-material/Phone'; 
// import EmailIcon from '@mui/icons-material/Email'; 
import Locations from '../components/Locations';
import FAQs from '../components/FAQs';

const HomePage = () => {
  const stats = [
    { icon: <PeopleIcon sx={{ fontSize: 50 }} />, number: '500,000+', label: 'Patients Served Annually' },
    { icon: <LocalHospitalIcon sx={{ fontSize: 50 }} />, number: '50+', label: 'Medical Specialties' },
    { icon: <VerifiedIcon sx={{ fontSize: 50 }} />, number: '1,200+', label: 'Expert Doctors' },
    { icon: <ApartmentIcon sx={{ fontSize: 50 }} />, number: '9', label: 'Branches Nationwide' },
  ];

  const excellence = [
    {
      title: 'Advanced Technology',
      description:
        'State-of-the-art medical equipment including 3T MRI, 128-slice CT scanners, da Vinci robotic surgery systems, and advanced cardiac catheterization labs ensure precise diagnosis and treatment.',
    },
    {
      title: 'Expert Medical Team',
      description:
        'Our team comprises highly qualified doctors, surgeons, and healthcare professionals with extensive experience and international training, many recognized as leaders in their respective fields.',
    },
    {
      title: 'Patient-Centric Care',
      description:
        'We prioritize compassionate, personalized care with dedicated patient coordinators, multilingual support staff, and comprehensive follow-up programs to ensure your complete wellbeing.',
    },
    {
      title: 'Accredited Excellence',
      description:
        'NABH and JCI accredited facilities meeting international standards for quality, safety, and patient care. Our commitment to excellence has earned numerous awards and recognition.',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      text: `The cardiac care team at HavenWell Health saved my life. From emergency admission to post-surgery recovery, every staff member showed exceptional professionalism and genuine care. The facilities are world-class, and Dr. Sharma's expertise is unmatched.`,
      rating: 5,
    },
    {
      name: 'Priya Menon',
      location: 'Chennai',
      text: 'I underwent orthopedic surgery at the Chennai branch, and the experience exceeded all expectations. The surgical team was highly skilled, the nursing staff was attentive, and the rehabilitation program helped me recover quickly. Truly grateful!',
      rating: 5,
    },
    {
      name: 'Amit Verma',
      location: 'Delhi',
      text: `HavenWell Health provided exceptional care during my mother's cancer treatment. The oncology department not only offered cutting-edge treatment but also emotional support throughout the journey. The multidisciplinary approach made all the difference.`,
      rating: 5,
    },
  ];

  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '420px', md: '640px' },
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(165, 28, 48, 0.82)',
            backdropFilter: 'brightness(0.85)',
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ maxWidth: '700px' }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#fff',
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Compassionate Care, Clinical Excellence
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#fff',
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                mb: 4,
                lineHeight: 1.6,
                opacity: 0.95,
              }}
            >
              Your health and wellbeing are our highest priorities. Experience healthcare that combines cutting-edge medical technology with genuine human compassion.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/appointment"
                sx={{
                  bgcolor: '#F0A202',
                  color: '#fff',
                  fontFamily: '"Viga", sans-serif',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  transition: 'all 0.35s cubic-bezier(.2,.8,.2,1)',
                  boxShadow: '0 8px 22px rgba(240,162,2,0.18)',
                  '&:hover': {
                    bgcolor: '#D89002',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 18px 50px rgba(240,162,2,0.22)',
                  },
                }}
              >
                Book Appointment
              </Button>
              <Button
                component={Link}
                to="/services"
                sx={{
                  bgcolor: 'transparent',
                  color: '#fff',
                  fontFamily: '"Viga", sans-serif',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  border: '2px solid #fff',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#fff',
                    color: '#A51C30',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Our Services
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

{/* Statistics Section */}
<Box sx={{ py: 6, bgcolor: '#fff' }}>
  <Container maxWidth="lg">
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Grid 
        container 
        spacing={3}
        sx={{
          maxWidth: { xs: '100%', md: '800px' },
          margin: '0 auto',
          justifyContent: 'center'
        }}
      >
        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 2, md: 4 },
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#FF7E7E10',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ color: '#F0A202', mb: 2 }}>
              <PeopleIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                mb: 1,
              }}
            >
              500,000+
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                fontSize: { xs: '0.85rem', md: '1rem' },
              }}
            >
              Patients Served Annually
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 2, md: 4 },
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#FF7E7E10',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ color: '#F0A202', mb: 2 }}>
              <LocalHospitalIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                mb: 1,
              }}
            >
              50+
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                fontSize: { xs: '0.85rem', md: '1rem' },
              }}
            >
              Medical Specialties
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 2, md: 4 },
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#FF7E7E10',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ color: '#F0A202', mb: 2 }}>
              <VerifiedIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                mb: 1,
              }}
            >
              1,200+
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                fontSize: { xs: '0.85rem', md: '1rem' },
              }}
            >
              Expert Doctors
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 2, md: 4 },
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#FF7E7E10',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ color: '#F0A202', mb: 2 }}>
              <ApartmentIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                mb: 1,
              }}
            >
              9
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                fontSize: { xs: '0.85rem', md: '1rem' },
              }}
            >
              Branches Nationwide
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 2, md: 4 },
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#FF7E7E10',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ color: '#F0A202', mb: 2 }}>
              <StarIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                mb: 1,
              }}
            >
              98%
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                fontSize: { xs: '0.85rem', md: '1rem' },
              }}
            >
              Patient Satisfaction
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 2, md: 4 },
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#FF7E7E10',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Box sx={{ color: '#F0A202', mb: 2 }}>
              <LocalHospitalIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                mb: 1,
              }}
            >
              24/7
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                fontSize: { xs: '0.85rem', md: '1rem' },
              }}
            >
              Emergency Care
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Container>
</Box>

      {/* About Section */}
      <Box sx={{ py: 8, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"Viga", sans-serif',
                  color: '#A51C30',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                About HavenWell Health
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#555',
                  mb: 2,
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                }}
              >
                Founded in 1985 by visionary physician Dr. Ramesh Malhotra, HavenWell Health began as a modest 50-bed hospital in Mumbai with a singular mission: to provide world-class healthcare accessible to all. What started with a dedicated team of 15 healthcare professionals has grown into India's leading multi-specialty hospital network.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#555',
                  mb: 2,
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                }}
              >
                Over the past four decades, we have expanded to nine major cities, serving over half a million patients annually. Our commitment to medical excellence, combined with compassionate patient care, has established us as a trusted healthcare partner for families across India and beyond.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#555',
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                }}
              >
                Today, HavenWell Health stands at the forefront of medical innovation, equipped with cutting-edge technology and staffed by over 1,200 expert physicians and 5,000 dedicated healthcare professionals. We continue Dr. Malhotra's legacy of putting patients first, ensuring every individual receives personalized, evidence-based care in a warm, supportive environment.
              </Typography>
              <Button
                component={Link}
                to="/about"
                sx={{
                  bgcolor: '#A51C30',
                  color: '#fff',
                  fontFamily: '"Viga", sans-serif',
                  px: 4,
                  py: 1.5,
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#8B1628',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 15px rgba(165, 28, 48, 0.3)',
                  },
                }}
              >
                Learn More About Us
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: '#fff',
                  borderRadius: '25px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Viga", sans-serif',
                    color: '#F0A202',
                    mb: 3,
                    textAlign: 'center',
                  }}
                >
                  Our Legacy in Numbers
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { year: '1985', text: 'Founded in Mumbai' },
                    { year: '2000', text: 'First Robotic Surgery in India' },
                    { year: '2010', text: 'Expanded to 5 Cities' },
                    { year: '2015', text: 'JCI Accreditation Achieved' },
                    { year: '2020', text: '500,000+ Annual Patients' },
                    { year: '2024', text: '9 Branches Nationwide' },
                  ].map((milestone, index) => (
                    <Grid item xs={6} key={index}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          borderRadius: '15px',
                          bgcolor: '#FF7E7E10',
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Viga", sans-serif',
                            color: '#A51C30',
                            fontSize: '1.5rem',
                            mb: 1,
                          }}
                        >
                          {milestone.year}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Noto Serif Georgian", serif',
                            color: '#666',
                            fontSize: '0.9rem',
                          }}
                        >
                          {milestone.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Excellence Section */}
      <Box sx={{ py: 8, bgcolor: '#fff' }}>
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
              Why Choose HavenWell Health?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                maxWidth: '800px',
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}
            >
              We combine medical excellence with compassionate care to deliver healthcare experiences that exceed expectations.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {excellence.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 30px rgba(165, 28, 48, 0.15)',
                      borderColor: '#F0A202',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: '"Viga", sans-serif',
                        color: '#A51C30',
                        mb: 2,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Noto Serif Georgian", serif',
                        color: '#666',
                        lineHeight: 1.8,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Locations Section */}
      <Locations />
      {/* Patient Testimonials */}
      <Box sx={{ py: 8, bgcolor: '#fff' }}>
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
              What Our Patients Say
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
              Real stories from real patients who have experienced the HavenWell difference.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    bgcolor: '#F9F9F9',
                    border: '2px solid #FF7E7E20',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <FormatQuoteIcon sx={{ fontSize: 40, color: '#A51C30' }} />

                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Noto Serif Georgian", serif',
                        color: '#555',
                        lineHeight: 1.7,
                        mt: 2,
                        mb: 3,
                      }}
                    >
                      {testimonial.text}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Viga", sans-serif',
                        color: '#A51C30',
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        mb: 1,
                        fontFamily: '"Noto Serif Georgian", serif',
                      }}
                    >
                      {testimonial.location}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: '#F0A202' }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* FAQs Section */}
      <FAQs />
    </Box>
  );
};

export default HomePage;