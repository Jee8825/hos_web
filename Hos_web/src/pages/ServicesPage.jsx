import { useState, useEffect } from 'react';
import { getServices } from '../services/api';
import socketService from '../services/socket';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { getRandomBanner } from '../utils/bannerUtils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HearingIcon from '@mui/icons-material/Hearing';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import SpaIcon from '@mui/icons-material/Spa';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const ServicesPage = () => {
  const navigate = useNavigate();
  
  const iconMap = {
    FavoriteIcon: <FavoriteIcon sx={{ fontSize: 50 }} />,
    PsychologyIcon: <PsychologyIcon sx={{ fontSize: 50 }} />,
    AccessibilityNewIcon: <AccessibilityNewIcon sx={{ fontSize: 50 }} />,
    VisibilityIcon: <VisibilityIcon sx={{ fontSize: 50 }} />,
    HearingIcon: <HearingIcon sx={{ fontSize: 50 }} />,
    PregnantWomanIcon: <PregnantWomanIcon sx={{ fontSize: 50 }} />,
    ChildCareIcon: <ChildCareIcon sx={{ fontSize: 50 }} />,
    LocalPharmacyIcon: <LocalPharmacyIcon sx={{ fontSize: 50 }} />,
    SpaIcon: <SpaIcon sx={{ fontSize: 50 }} />,
    PrecisionManufacturingIcon: <PrecisionManufacturingIcon sx={{ fontSize: 50 }} />,
    MonitorHeartIcon: <MonitorHeartIcon sx={{ fontSize: 50 }} />,
    VaccinesIcon: <VaccinesIcon sx={{ fontSize: 50 }} />,
  };

  const defaultServices = [
    {
      icon: <FavoriteIcon sx={{ fontSize: 50 }} />,
      title: 'Cardiology',
      description:
        'Comprehensive cardiac care including advanced interventional cardiology, cardiac surgery, electrophysiology, and preventive cardiology. Our state-of-the-art cath labs and experienced cardiologists provide world-class treatment for all heart conditions.',
      features: ['Angioplasty & Stenting', 'Bypass Surgery', 'Pacemaker Implantation', 'Heart Failure Management'],
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 50 }} />,
      title: 'Neurology & Neurosurgery',
      description:
        'Advanced neurological care for brain and spine disorders. Our neuro-specialists utilize cutting-edge imaging and minimally invasive techniques to treat strokes, epilepsy, movement disorders, and complex neurological conditions.',
      features: ['Stroke Care', 'Brain Tumor Surgery', 'Spine Surgery', 'Epilepsy Management'],
    },
    {
      icon: <AccessibilityNewIcon sx={{ fontSize: 50 }} />,
      title: 'Orthopedics',
      description:
        'Complete orthopedic solutions including joint replacement, sports medicine, trauma care, and spine surgery. Our orthopedic surgeons are renowned for successful outcomes in complex reconstructive procedures.',
      features: ['Joint Replacement', 'Sports Injury Treatment', 'Arthroscopy', 'Fracture Management'],
    },
    {
      icon: <LocalPharmacyIcon sx={{ fontSize: 50 }} />,
      title: 'Oncology',
      description:
        'Multidisciplinary cancer care with medical, surgical, and radiation oncology services. We offer personalized treatment plans, chemotherapy, immunotherapy, and comprehensive support services for cancer patients and families.',
      features: ['Chemotherapy', 'Radiation Therapy', 'Surgical Oncology', 'Palliative Care'],
    },
    {
      icon: <PregnantWomanIcon sx={{ fontSize: 50 }} />,
      title: 'Obstetrics & Gynecology',
      description:
        `Complete women's health services including prenatal care, high-risk pregnancy management, gynecological surgeries, and fertility treatments. Our maternity suites provide a comfortable, family-centered birthing experience.`,
      features: ['Prenatal Care', 'High-Risk Pregnancies', 'Fertility Treatment', 'Minimally Invasive Surgery'],
    },
    {
      icon: <ChildCareIcon sx={{ fontSize: 50 }} />,
      title: 'Pediatrics',
      description:
        'Specialized care for infants, children, and adolescents with pediatric ICU, neonatal care, pediatric surgery, and developmental services. Our child-friendly environment ensures comfortable treatment for young patients.',
      features: ['Neonatal Care', 'Pediatric Surgery', 'Vaccination Programs', 'Growth Monitoring'],
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 50 }} />,
      title: 'Ophthalmology',
      description:
        'Advanced eye care including cataract surgery, LASIK, retinal surgery, and treatment for glaucoma and diabetic retinopathy. Our ophthalmologists use the latest technology for precise, successful outcomes.',
      features: ['Cataract Surgery', 'LASIK', 'Retinal Treatment', 'Glaucoma Management'],
    },
    {
      icon: <HearingIcon sx={{ fontSize: 50 }} />,
      title: 'ENT (Ear, Nose, Throat)',
      description:
        'Comprehensive ENT services for sinus disorders, hearing problems, voice disorders, and head-neck surgery. Our specialists provide both medical management and surgical interventions for all ENT conditions.',
      features: ['Sinus Surgery', 'Hearing Aids', 'Tonsillectomy', 'Voice Therapy'],
    },
    {
      icon: <MonitorHeartIcon sx={{ fontSize: 50 }} />,
      title: 'Emergency & Critical Care',
      description:
        'Round-the-clock emergency services with advanced trauma care, critical care units, and rapid response teams. Our emergency department is equipped to handle all medical emergencies with immediate, expert intervention.',
      features: ['24/7 Emergency', 'Trauma Care', 'Intensive Care Units', 'Ambulance Services'],
    },
    {
      icon: <SpaIcon sx={{ fontSize: 50 }} />,
      title: 'Gastroenterology',
      description:
        'Expert care for digestive system disorders including endoscopy, colonoscopy, liver disease management, and inflammatory bowel disease treatment. Our gastroenterologists provide comprehensive diagnostic and therapeutic services.',
      features: ['Endoscopy', 'Liver Disease Care', 'IBD Treatment', 'Nutritional Counseling'],
    },
    {
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 50 }} />,
      title: 'Robotic Surgery',
      description:
        'Minimally invasive robotic-assisted surgeries using da Vinci surgical systems for urological, gynecological, and general surgical procedures. Enhanced precision results in faster recovery and better outcomes.',
      features: ['Prostate Surgery', 'Hysterectomy', 'Hernia Repair', 'Colorectal Surgery'],
    },
    {
      icon: <VaccinesIcon sx={{ fontSize: 50 }} />,
      title: 'Preventive Health',
      description:
        'Comprehensive health checkup packages, vaccination programs, health screenings, and wellness counseling. Our preventive care approach helps detect diseases early and maintain optimal health.',
      features: ['Full Body Checkups', 'Cancer Screening', 'Cardiac Assessment', 'Diabetes Screening'],
    },
  ];

  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        if (response.data && response.data.length > 0) {
          const normalizedServices = response.data.map(service => ({
            ...service,
            icon: service.iconName || service.icon,
            features: service.keyServices || service.features || [],
          }));
          setServices(normalizedServices);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const handleServiceCreated = (service) => {
      const normalizedService = {
        ...service,
        icon: service.iconName || service.icon,
        features: service.keyServices || service.features || [],
      };
      setServices(prev => [...prev, normalizedService]);
    };

    const handleServiceUpdated = (service) => {
      const normalizedService = {
        ...service,
        icon: service.iconName || service.icon,
        features: service.keyServices || service.features || [],
      };
      setServices(prev => prev.map(s => s._id === service._id ? normalizedService : s));
    };

    const handleServiceDeleted = ({ id }) => {
      setServices(prev => prev.filter(s => s._id !== id));
    };

    socketService.on('service:created', handleServiceCreated);
    socketService.on('service:updated', handleServiceUpdated);
    socketService.on('service:deleted', handleServiceDeleted);

    return () => {
      socketService.off('service:created', handleServiceCreated);
      socketService.off('service:updated', handleServiceUpdated);
      socketService.off('service:deleted', handleServiceDeleted);
    };
  }, []);

  const [bannerImage] = useState(getRandomBanner());

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          color: '#fff',
          py: 8,
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
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Viga", sans-serif',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3,
              textAlign: 'center',
            }}
          >
            Our Medical Services
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Noto Serif Georgian", serif',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              textAlign: 'center',
              maxWidth: '900px',
              mx: 'auto',
              lineHeight: 1.7,
              opacity: 0.95,
            }}
          >
            HavenWell Health offers a comprehensive range of medical specialties and services, combining cutting-edge technology with compassionate care to deliver exceptional health outcomes for our patients.
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box sx={{ py: 8, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {services.map((service, index) => {
              const serviceIcon = typeof service.icon === 'string' ? iconMap[service.icon] : service.icon;
              const serviceFeatures = Array.isArray(service.features) ? service.features : [];
              
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: '20px',
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 35px rgba(165, 28, 48, 0.15)',
                        borderColor: '#F0A202',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          color: '#F0A202',
                          mb: 3,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {serviceIcon || <MedicalServicesIcon sx={{ fontSize: 50 }} />}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Viga", sans-serif',
                          color: '#A51C30',
                          mb: 2,
                          textAlign: 'center',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: '"Noto Serif Georgian", serif',
                          color: '#666',
                          lineHeight: 1.8,
                          mb: 3,
                        }}
                      >
                        {service.description}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: '#FF7E7E10',
                          borderRadius: '15px',
                          p: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontFamily: '"Viga", sans-serif',
                            color: '#A51C30',
                            mb: 1,
                          }}
                        >
                          Key Services:
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 2 }}>
                          {serviceFeatures.length > 0 ? (
                            serviceFeatures.map((feature, idx) => (
                              <Typography
                                component="li"
                                key={idx}
                                sx={{
                                  fontFamily: '"Noto Serif Georgian", serif',
                                  color: '#555',
                                  fontSize: '0.9rem',
                                  mb: 0.5,
                                }}
                              >
                                {feature}
                              </Typography>
                            ))
                          ) : (
                            <Typography
                              sx={{
                                fontFamily: '"Noto Serif Georgian", serif',
                                color: '#555',
                                fontSize: '0.9rem',
                              }}
                            >
                              No features available
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Additional Services Section */}
      <Box sx={{ py: 8, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Viga", sans-serif',
              color: '#A51C30',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Additional Services & Facilities
          </Typography>
          <Grid container spacing={3}>
            {[
              'Dialysis Center',
              'Blood Bank',
              'Pharmacy',
              '24/7 Laboratory',
              'Physiotherapy',
              'Nutrition & Dietetics',
              'Radiology & Imaging',
              'Home Healthcare',
              'Ambulance Services',
              'Telemedicine',
              'Health Insurance Desk',
              'International Patient Services',
            ].map((facility, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: '#F9F9F9',
                    borderRadius: '15px',
                    border: '2px solid #FF7E7E20',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#FF7E7E10',
                      borderColor: '#F0A202',
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Noto Serif Georgian", serif',
                      color: '#A51C30',
                      fontWeight: 600,
                    }}
                  >
                    {facility}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: '#A51C30',
          color: '#fff',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Viga", sans-serif',
                mb: 3,
              }}
            >
              Need Medical Assistance?
            </Typography>
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
              Our expert medical team is available 24/7 to provide you with the best healthcare services. Book an appointment or contact us for any medical emergency.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box
                onClick={() => navigate('/contact')}
                sx={{
                  bgcolor: '#F0A202',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: '30px',
                  fontFamily: '"Viga", sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#D89002',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(240, 162, 2, 0.4)',
                  },
                }}
              >
                Emergency: 1800-123-4567
              </Box>
              <Box
                onClick={() => navigate('/appointment')}
                sx={{
                  bgcolor: 'transparent',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: '30px',
                  border: '2px solid #fff',
                  fontFamily: '"Viga", sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#fff',
                    color: '#A51C30',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Book Appointment
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ServicesPage;