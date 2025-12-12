import { useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { getRandomBanner } from '../utils/bannerUtils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import { keyframes } from '@mui/system';

// Define simple fade-in keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Helper component for animated sections (simulating Intersection Observer)
const AnimatedSection = ({ children, delay = 0, ...props }) => (
  <Box
    sx={{
      animation: `${fadeIn} 0.6s ease-out ${delay}s both`,
      // Ensure the Box itself takes necessary space for layout
      height: '100%', 
    }}
    {...props}
  >
    {children}
  </Box>
);

const AboutPage = () => {
  const [bannerImage] = useState(getRandomBanner());
  const values = [
    {
      icon: <FavoriteIcon sx={{ fontSize: 50 }} />,
      title: 'Compassion',
      description: 'We treat every patient with empathy, dignity, and respect, understanding that healing extends beyond medical treatment.',
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 50 }} />,
      title: 'Excellence',
      description: 'We pursue the highest standards in medical care, continuously advancing our knowledge, skills, and technology.',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 50 }} />,
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and ethical practices in all aspects of patient care and business operations.',
    },
    {
      icon: <StarIcon sx={{ fontSize: 50 }} />,
      title: 'Innovation',
      description: 'We embrace cutting-edge medical technologies and evidence-based practices to deliver superior healthcare outcomes.',
    },
  ];

  const achievements = [
    {
      year: '2023',
      award: 'Best Multi-Specialty Hospital',
      org: 'National Healthcare Excellence Awards',
    },
    {
      year: '2022',
      award: 'JCI Accreditation Renewal',
      org: 'Joint Commission International',
    },
    {
      year: '2021',
      award: 'Excellence in Cardiac Care',
      org: 'Indian Medical Association',
    },
    {
      year: '2020',
      award: 'Best Patient Safety Practices',
      org: 'Healthcare Quality Council',
    },
    {
      year: '2019',
      award: 'Top Employer in Healthcare',
      org: 'Great Place to Work Institute',
    },
    {
      year: '2018',
      award: 'Innovation in Medical Technology',
      org: 'Medical Technology Summit',
    },
  ];

  const leadership = [
    {
      name: 'Dr. Rajesh Malhotra',
      position: 'Chairman & CEO',
      bio: 'Son of founder Dr. Ramesh Malhotra, Dr. Rajesh leads with 30+ years of healthcare management experience, driving HavenWell Health\'s expansion and innovation.',
    },
    {
      name: 'Dr. Priya Sharma',
      position: 'Chief Medical Officer',
      bio: 'Renowned cardiologist with expertise in interventional cardiology. Oversees clinical excellence and medical protocols across all facilities.',
    },
    {
      name: 'Mr. Anil Kumar',
      position: 'Chief Operations Officer',
      bio: 'Healthcare administration expert ensuring operational efficiency, quality standards, and patient satisfaction across the network.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          color: '#fff',
          pt: { xs: 12, md: 15 }, 
          pb: { xs: 12, md: 15 },
          mt: { xs: 7, md: 8 },
          textAlign: 'center',
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(165, 28, 48, 0.85)',
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Container maxWidth="xl">
          <AnimatedSection delay={0.1}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Viga", sans-serif',
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                mb: 3,
              }}
            >
              About HavenWell Health
            </Typography>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                maxWidth: '1000px',
                mx: 'auto',
                lineHeight: 1.7,
                opacity: 0.95,
              }}
            >
              Four decades of **compassionate care**, **clinical excellence**, and unwavering commitment to improving lives through world-class healthcare.
            </Typography>
          </AnimatedSection>
        </Container>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <AnimatedSection delay={0.1}>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: '"Viga", sans-serif',
                    color: '#A51C30',
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  Our Story 📖
                </Typography>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
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
                  In 1985, Dr. Ramesh Malhotra, a visionary physician who had trained at some of the world's finest medical institutions, returned to India with a dream. He envisioned a healthcare system that would combine international standards of medical excellence with the **warmth and compassion inherent to Indian culture**.
                </Typography>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
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
                  Starting with a modest 50-bed facility in Mumbai, Dr. Malhotra assembled a team of dedicated healthcare professionals who shared his vision. The hospital quickly gained recognition for its **patient-centric approach** and clinical outcomes that rivaled international standards.
                </Typography>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
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
                  The year **2000** marked a significant milestone when HavenWell Health performed India's **first successful robotic-assisted cardiac surgery**, establishing itself as a pioneer in advanced medical technology. This achievement opened doors to further innovations and expansions.
                </Typography>
              </AnimatedSection>
              <AnimatedSection delay={0.5}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: '"Noto Serif Georgian", serif',
                    color: '#555',
                    lineHeight: 1.8,
                    fontSize: '1.05rem',
                  }}
                >
                  Today, under the leadership of Dr. Rajesh Malhotra, the founder's son, HavenWell Health operates nine state-of-the-art facilities across India. We serve over 500,000 patients annually, employ more than 6,000 healthcare professionals, and continue to set new benchmarks in medical excellence while staying true to our founding principle: compassionate care for every patient, every time.
                </Typography>
              </AnimatedSection>
            </Grid>
            <Grid item xs={12} md={6}>
              <AnimatedSection delay={0.6}>
                <Box
                  sx={{
                    p: { xs: 3, md: 5 },
                    bgcolor: '#fff',
                    borderRadius: '25px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                    mt: { xs: 4, md: 0 },
                    height: '100%', // Ensure this box takes full height
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Viga", sans-serif',
                      color: '#F0A202',
                      mb: 4,
                      textAlign: 'center',
                      fontSize: '1.8rem',
                    }}
                  >
                    Milestones of Excellence 🏆
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {[
                      { year: '1985', event: 'HavenWell Health founded in Mumbai with 50 beds' },
                      { year: '1992', event: 'Expanded to 200 beds, introduced advanced ICU' },
                      { year: '2000', event: 'India\'s first robotic-assisted cardiac surgery' },
                      { year: '2005', event: 'Opened second facility in Chennai' },
                      { year: '2010', event: 'Expanded to five cities nationwide' },
                      { year: '2015', event: 'Achieved JCI accreditation for all facilities' },
                      { year: '2018', event: 'Launched telemedicine services' },
                      { year: '2020', event: 'Crossed 500,000 annual patient milestone' },
                      { year: '2024', event: 'Operating across nine major Indian cities' },
                    ].map((milestone, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          gap: 2,
                          p: 2,
                          borderLeft: '4px solid #F0A202',
                          bgcolor: '#FF7E7E10',
                          borderRadius: '10px',
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            bgcolor: '#FF7E7E20',
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Viga", sans-serif',
                            color: '#A51C30',
                            fontSize: '1.3rem',
                            minWidth: '70px',
                            fontWeight: 700,
                          }}
                        >
                          {milestone.year}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Noto Serif Georgian", serif',
                            color: '#444',
                            lineHeight: 1.6,
                            fontSize: '1.05rem',
                          }}
                        >
                          {milestone.event}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </AnimatedSection>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <Grid container spacing={5}>
            {/* Mission Card */}
            <Grid item xs={12} md={6}>
              <AnimatedSection delay={0.1}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '25px', 
                    bgcolor: '#A51C30',
                    color: '#fff',
                    boxShadow: '0 10px 40px rgba(165, 28, 48, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 15px 50px rgba(165, 28, 48, 0.5)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: '"Viga", sans-serif',
                        mb: 3,
                        color: '#F0A202',
                        fontSize: { xs: '2rem', md: '2.5rem' },
                      }}
                    >
                      Our Mission 🎯
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Noto Serif Georgian", serif',
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                      }}
                    >
                      To provide accessible, affordable, and **world-class healthcare** services that combine cutting-edge medical technology with **compassionate, patient-centered care**. We strive to improve health outcomes, enhance quality of life, and set new standards of excellence in Indian healthcare while maintaining unwavering ethical practices and social responsibility.
                    </Typography>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </Grid>
            {/* Vision Card */}
            <Grid item xs={12} md={6}>
              <AnimatedSection delay={0.3}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '25px',
                    bgcolor: '#F0A202',
                    color: '#fff',
                    boxShadow: '0 10px 40px rgba(240, 162, 2, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 15px 50px rgba(240, 162, 2, 0.5)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: '"Viga", sans-serif',
                        mb: 3,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                      }}
                    >
                      Our Vision 💡
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Noto Serif Georgian", serif',
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                      }}
                    >
                      To be India's most **trusted and respected healthcare provider**, recognized globally for clinical excellence, medical innovation, and compassionate patient care. We envision a future where every individual has access to quality healthcare that respects their dignity, addresses their unique needs, and empowers them to lead healthier, more fulfilling lives.
                    </Typography>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core Values */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="xl">
          <AnimatedSection delay={0.1}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                textAlign: 'center',
                fontSize: { xs: '2.5rem', md: '3rem' },
              }}
            >
              Our Core Values ✨
            </Typography>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                textAlign: 'center',
                maxWidth: '900px',
                mx: 'auto',
                mb: 6,
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}
            >
              These principles guide every decision we make and every interaction we have with patients, families, and communities.
            </Typography>
          </AnimatedSection>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <AnimatedSection delay={0.1 * index}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: '25px', 
                      textAlign: 'center',
                      border: '2px solid #e0e0e0',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      display: 'flex', // Enable flexbox for inner alignment
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-10px) scale(1.02)',
                        boxShadow: '0 15px 40px rgba(165, 28, 48, 0.25)',
                        borderColor: '#F0A202',
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}> {/* flexGrow for content */}
                      <Box sx={{ color: '#F0A202', mb: 2 }}>{value.icon}</Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Viga", sans-serif',
                          color: '#A51C30',
                          mb: 2,
                          fontSize: '1.4rem',
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: '"Noto Serif Georgian", serif',
                          color: '#666',
                          lineHeight: 1.7,
                          fontSize: '0.95rem',
                        }}
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Leadership Team */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <AnimatedSection delay={0.1}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                textAlign: 'center',
                fontSize: { xs: '2.5rem', md: '3rem' },
              }}
            >
              Leadership Team 👨‍⚕️
            </Typography>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                textAlign: 'center',
                maxWidth: '900px',
                mx: 'auto',
                mb: 6,
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}
            >
              Our experienced leadership team brings together decades of healthcare expertise, strategic vision, and unwavering commitment to excellence.
            </Typography>
          </AnimatedSection>
          <Grid container spacing={5} justifyContent="center">
            {leadership.map((leader, index) => (
              <Grid item xs={12} md={4} key={index}>
                <AnimatedSection delay={0.1 * index}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: '25px',
                      border: '2px solid #FF7E7E20',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      display: 'flex', // Enable flexbox for inner alignment
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 15px 40px rgba(240, 162, 2, 0.25)',
                        borderColor: '#F0A202',
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', flexGrow: 1 }}>
                      <Box
                        sx={{
                          width: 120, 
                          height: 120,
                          borderRadius: '50%',
                          bgcolor: '#FF7E7E20',
                          border: '4px solid #F0A202',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Viga", sans-serif',
                            color: '#A51C30',
                            fontSize: '2.5rem',
                          }}
                        >
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Viga", sans-serif',
                          color: '#A51C30',
                          mb: 1,
                          fontSize: '1.5rem',
                        }}
                      >
                        {leader.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: '"Noto Serif Georgian", serif',
                          color: '#F0A202',
                          mb: 2,
                          fontWeight: 700,
                          fontSize: '1.1rem',
                        }}
                      >
                        {leader.position}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: '"Noto Serif Georgian", serif',
                          color: '#666',
                          lineHeight: 1.7,
                          fontSize: '0.95rem',
                        }}
                      >
                        {leader.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Awards & Recognition */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="xl">
          <AnimatedSection delay={0.1}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                textAlign: 'center',
                fontSize: { xs: '2.5rem', md: '3rem' },
              }}
            >
              Awards & Recognition 🥇
            </Typography>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                textAlign: 'center',
                maxWidth: '900px',
                mx: 'auto',
                mb: 6,
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}
            >
              Our commitment to excellence has been recognized by prestigious national and international healthcare organizations.
            </Typography>
          </AnimatedSection>
          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AnimatedSection delay={0.1 * index}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: '25px',
                      bgcolor: '#fff',
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                      display: 'flex', // Enable flexbox for inner alignment
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(165, 28, 48, 0.15)',
                        border: '1px solid #F0A202',
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <EmojiEventsIcon sx={{ color: '#F0A202', fontSize: '2.5rem' }} />
                        <Typography
                          sx={{
                            fontFamily: '"Viga", sans-serif',
                            color: '#A51C30',
                            fontSize: '1.8rem',
                          }}
                        >
                          {achievement.year}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Viga", sans-serif',
                          color: '#A51C30',
                          mb: 1,
                          fontSize: '1.2rem',
                          minHeight: '2.4rem', // FIX: Ensures uniform alignment for titles (1 or 2 lines)
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {achievement.award}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: '"Noto Serif Georgian", serif',
                          color: '#666',
                        }}
                      >
                        **{achievement.org}**
                      </Typography>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: '#A51C30',
          color: '#fff',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <AnimatedSection delay={0.1}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Viga", sans-serif',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Join Our Healthcare Journey
              </Typography>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  opacity: 0.95,
                }}
              >
                Experience the HavenWell difference where compassion meets excellence. Schedule your appointment today and become part of our extended family.
              </Typography>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <Box
                component="a"
                href="/contact"
                sx={{
                  bgcolor: '#F0A202',
                  color: '#fff',
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: '35px',
                  fontFamily: '"Viga", sans-serif',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: '#D89002',
                    transform: 'translateY(-4px) scale(1.03)',
                    boxShadow: '0 10px 30px rgba(240, 162, 2, 0.4)',
                  },
                }}
              >
                Contact Us Today
              </Box>
            </AnimatedSection>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;