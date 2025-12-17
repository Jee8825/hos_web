import { useState } from 'react';
import { createMessage } from '../services/api';
import { getRandomBanner } from '../utils/bannerUtils';
import { saveFormDraft, getFormDraft, clearFormDraft, getUserInfo, updateUserInfo } from '../utils/localStorage';
import PrefilledBadge from '../components/PrefilledBadge';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';

const ContactPage = () => {
  const [bannerImage] = useState(getRandomBanner());
  const [formData, setFormData] = useState(() => {
    const draft = getFormDraft('contact');
    if (draft) return draft;
    
    // Prefill with saved user info
    const userInfo = getUserInfo();
    const hasPrefill = !!(userInfo?.name || userInfo?.email || userInfo?.phone);
    
    if (hasPrefill) {
      setTimeout(() => setIsPrefilled(true), 100);
    }
    
    return {
      name: userInfo?.name || '',
      email: userInfo?.email || '',
      phone: userInfo?.phone || '',
      subject: '',
      message: '',
    };
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isPrefilled, setIsPrefilled] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Only letters are allowed';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else {
          const cleanPhone = value.replace(/[\s\-()]/g, '');
          if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
            error = 'Phone number must be 10 digits starting with 6, 7, 8, or 9';
          }
        }
        break;

      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        }
        break;

      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 20) {
          error = 'Message must be at least 20 characters';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
    saveFormDraft('contact', newFormData);

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Save user info for future prefill
        updateUserInfo({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        });
        
        await createMessage({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `${formData.subject}: ${formData.message}`
        });
        setSubmitSuccess(true);
        clearFormDraft('contact');
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          });
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        console.error('Error submitting message:', error);
        setErrors({ submit: 'Failed to send message. Please try again.' });
      }
    }
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Helpline',
      details: ['+91 1800-123-4567', '+91 22 2345 6789'],
      color: '#F0A202',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email Us',
      details: ['info@havenwellhealth.com', 'support@havenwellhealth.com'],
      color: '#FF7E7E',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Main Office',
      details: ['123 Marine Drive', 'Andheri West, Mumbai - 400058'],
      color: '#A51C30',
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      title: 'Working Hours',
      details: ['Emergency: 24/7', 'OPD: Mon-Sat, 9 AM - 6 PM'],
      color: '#F0A202',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          color: '#fff',
          py: 6,
          mt: { xs: 7, md: 8 },
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
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Viga", sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.7,
                opacity: 0.95,
              }}
            >
              We're here to help. Reach out to us for any questions, concerns, or feedback. Your health and satisfaction are our top priorities.
            </Typography>
          </Box>
        </Container>
        </Container>
      </Box>

      {/* Contact Information Cards */}
      <Box sx={{ py: 6, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    border: `2px solid ${info.color}40`,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                      borderColor: info.color,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ color: info.color, mb: 2 }}>{info.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Viga", sans-serif',
                        color: '#A51C30',
                        mb: 2,
                      }}
                    >
                      {info.title}
                    </Typography>
                    {info.details.map((detail, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          fontFamily: '"Noto Serif Georgian", serif',
                          color: '#666',
                          mb: 0.5,
                        }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box sx={{ py: 8, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Viga", sans-serif',
                    color: '#A51C30',
                  }}
                >
                  Send Us a Message
                </Typography>
                <PrefilledBadge show={isPrefilled} />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                Have a question or feedback? Fill out the form below and our team will get back to you within 24 hours. For urgent matters, please call our helpline.
              </Typography>

              {submitSuccess && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    borderRadius: '15px',
                    fontFamily: '"Noto Serif Georgian", serif',
                  }}
                >
                  Thank you for contacting us! We have received your message and will respond shortly.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '15px',
                          fontFamily: '"Noto Serif Georgian", serif',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '15px',
                          fontFamily: '"Noto Serif Georgian", serif',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '15px',
                          fontFamily: '"Noto Serif Georgian", serif',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '15px',
                          fontFamily: '"Noto Serif Georgian", serif',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message || 'Minimum 20 characters'}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '15px',
                          fontFamily: '"Noto Serif Georgian", serif',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      endIcon={<SendIcon />}
                      sx={{
                        bgcolor: '#A51C30',
                        color: '#fff',
                        fontFamily: '"Viga", sans-serif',
                        fontSize: '1.1rem',
                        py: 1.5,
                        borderRadius: '25px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: '#8B1628',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(165, 28, 48, 0.3)',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '25px',
                  bgcolor: '#F9F9F9',
                  border: '2px solid #FF7E7E20',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Viga", sans-serif',
                      color: '#A51C30',
                      mb: 3,
                    }}
                  >
                    Why Contact HavenWell Health?
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {[
                      {
                        title: 'Quick Response Time',
                        desc: 'Our dedicated team responds to all inquiries within 24 hours during business days.',
                      },
                      {
                        title: 'Multiple Contact Channels',
                        desc: 'Reach us via phone, email, or visit any of our nine branches across India.',
                      },
                      {
                        title: 'Patient Support Services',
                        desc: 'Get assistance with appointments, medical records, billing, and insurance queries.',
                      },
                      {
                        title: 'Multilingual Support',
                        desc: 'Our staff can assist you in English, Hindi, and various regional languages.',
                      },
                      {
                        title: 'Feedback & Complaints',
                        desc: 'We value your feedback and take all concerns seriously to improve our services.',
                      },
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 3,
                          bgcolor: '#fff',
                          borderRadius: '15px',
                          borderLeft: '4px solid #F0A202',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: '"Viga", sans-serif',
                            color: '#A51C30',
                            mb: 1,
                            fontSize: '1.1rem',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: '"Noto Serif Georgian", serif',
                            color: '#666',
                            lineHeight: 1.7,
                          }}
                        >
                          {item.desc}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Emergency Contact Section */}
      <Box
        sx={{
          py: 6,
          bgcolor: '#A51C30',
          color: '#fff',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                mb: 2,
              }}
            >
              Need Immediate Medical Assistance?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                mb: 3,
                fontSize: '1.1rem',
                opacity: 0.95,
              }}
            >
              For medical emergencies, please call our 24/7 emergency helpline or visit the nearest HavenWell Health facility.
            </Typography>
            <Box
              sx={{
                bgcolor: '#F0A202',
                color: '#fff',
                px: 5,
                py: 2,
                borderRadius: '30px',
                fontFamily: '"Viga", sans-serif',
                fontSize: '1.5rem',
                display: 'inline-block',
                boxShadow: '0 4px 15px rgba(240, 162, 2, 0.3)',
              }}
            >
              Emergency: 1800-123-4567
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage;