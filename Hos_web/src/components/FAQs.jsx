import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button, // Import Button component
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Assuming your contacts page path is '/contact' based on your AppRoutes
const CONTACTS_PAGE_PATH = '/contact';

const FAQs = () => {
  // Initialize useNavigate hook
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Function to handle navigation to the contact page
  const handleContactNavigation = () => {
    navigate(CONTACTS_PAGE_PATH);
  };

  const faqs = [
    {
      question: 'How do I book an appointment at HavenWell Health?',
      answer:
        'Booking an appointment is easy! You can schedule through our website by clicking the "Appointment" button in the navigation menu, call our helpline at 1800-123-4567, or visit any of our branches directly. Our online booking system is available 24/7, and you can choose your preferred doctor, date, and time slot.',
    },
    {
      question: 'What insurance plans does HavenWell Health accept?',
      answer:
        'HavenWell Health accepts a wide range of insurance plans including major providers such as Star Health, HDFC Ergo, ICICI Lombard, Max Bupa, Bajaj Allianz, and many more. We also accept government health schemes like Ayushman Bharat. For specific insurance queries, please contact our billing department at billing@havenwellhealth.com or call us at 1800-123-4567.',
    },
    {
      question: 'Are emergency services available at all HavenWell Health locations?',
      answer:
        'Yes, all nine HavenWell Health facilities operate 24/7 emergency departments equipped with advanced life-support systems, trauma care units, and dedicated emergency medical teams. Our emergency services include critical care, accident and trauma management, cardiac emergencies, stroke care, and pediatric emergencies. Walk-ins are always welcome for urgent medical needs.',
    },
    {
      question: 'What specialties and departments does HavenWell Health offer?',
      answer:
        'HavenWell Health provides comprehensive medical care across multiple specialties including Cardiology, Neurology, Orthopedics, Oncology, Pediatrics, Gynecology, Gastroenterology, Nephrology, Pulmonology, Dermatology, ENT, Ophthalmology, Psychiatry, and more. We also have specialized centers for robotic surgery, fertility treatment, sports medicine, and preventive health checkups.',
    },
    {
      question: 'Can I get my medical reports online?',
      answer:
        'Yes! HavenWell Health offers a secure patient portal where you can access your medical records, lab reports, imaging results, and prescription history. Simply register on our website using your patient ID, and you will receive login credentials via email. The portal is accessible from any device, and reports are typically uploaded within 24-48 hours of testing.',
    },
    {
      question: 'Does HavenWell Health provide international patient services?',
      answer:
        'Absolutely. Our International Patient Services department assists patients traveling from abroad with visa assistance, airport pickup, interpreter services, accommodation arrangements, and personalized treatment plans. We have dedicated international patient coordinators who ensure a seamless healthcare experience. Contact us at international@havenwellhealth.com for more information.',
    },
    {
      question: 'What are the visiting hours for patients admitted to the hospital?',
      answer:
        'General visiting hours are from 4:00 PM to 7:00 PM daily. However, ICU and critical care units have restricted visiting hours from 11:00 AM to 12:00 PM and 5:00 PM to 6:00 PM, with only two visitors allowed at a time. These timings may vary based on department policies and patient conditions. Please check with the nursing station for specific unit guidelines.',
    },
    {
      question: 'Does HavenWell Health offer preventive health checkup packages?',
      answer:
        'Yes, we offer comprehensive preventive health checkup packages tailored for different age groups and health concerns. Our packages include full body checkups, cardiac screening, diabetes screening, cancer screening, women\'s wellness, senior citizen packages, and executive health checkups. These packages are designed for early detection and prevention of diseases, helping you maintain optimal health.',
    },
    {
      question: 'How can I provide feedback or file a complaint?',
      answer:
        'Patient satisfaction is our priority. You can provide feedback or file complaints through our website feedback form, email us at feedback@havenwellhealth.com, call our patient relations department at 1800-123-4567, or speak directly with our on-site patient grievance officers available at all branches. We take all feedback seriously and strive to address concerns within 48 hours.',
    },
    {
      question: 'Are telemedicine consultations available?',
      answer:
      'Yes, HavenWell Health offers telemedicine services for non-emergency consultations. You can book video or phone consultations with our doctors through our website or mobile app. Telemedicine is ideal for follow-up visits, prescription renewals, minor health concerns, and specialist consultations. The service is available across all specialties, and appointments can be scheduled at your convenience.',
    },
  ];

  return (
    <Box
      id="faqs"
      sx={{
        py: 8,
        bgcolor: '#F9F9F9',
      }}
    >
      <Container maxWidth="lg">
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
            Frequently Asked Questions
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
            Find answers to common questions about our services, appointments, and facilities. Can't find what you're looking for? Contact us directly.
          </Typography>
        </Box>

        <Box>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                borderRadius: '15px !important',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '0 0 16px 0',
                  boxShadow: '0 4px 20px rgba(165, 28, 48, 0.1)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: expanded === `panel${index}` ? '#F0A202' : '#A51C30',
                      transition: 'all 0.3s ease',
                    }}
                  />
                }
                sx={{
                  bgcolor: expanded === `panel${index}` ? '#FF7E7E10' : '#fff',
                  borderRadius: '15px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#FF7E7E10',
                  },
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Viga", sans-serif',
                    color: '#A51C30',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  borderTop: '1px solid #e0e0e0',
                  pt: 3,
                  pb: 2,
                  bgcolor: '#fff',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Noto Serif Georgian", serif',
                    color: '#555',
                    lineHeight: 1.8,
                    fontSize: '1rem',
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box
          sx={{
            mt: 6,
            p: 4,
            bgcolor: '#A51C30',
            borderRadius: '20px',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Viga", sans-serif',
              color: '#fff',
              mb: 2,
            }}
          >
            Still Have Questions?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Noto Serif Georgian", serif',
              color: '#fff',
              mb: 3,
              opacity: 0.9,
            }}
          >
            Our dedicated support team is here to help you with any queries.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {/* Call Button: Calls handleContactNavigation */}
            <Button
              variant="contained"
              onClick={handleContactNavigation}
              sx={{
                bgcolor: '#F0A202',
                color: '#fff',
                px: 4,
                py: 1.5,
                borderRadius: '25px',
                fontFamily: '"Viga", sans-serif',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#D89002',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 15px rgba(240, 162, 2, 0.3)',
                },
              }}
            >
              Call: 1800-123-4567
            </Button>
            {/* Email Button: Calls handleContactNavigation */}
            <Button
              variant="contained"
              onClick={handleContactNavigation}
              sx={{
                bgcolor: '#FF7E7E',
                color: '#fff',
                px: 4,
                py: 1.5,
                borderRadius: '25px',
                fontFamily: '"Viga", sans-serif',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#FF6B6B',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 15px rgba(255, 126, 126, 0.3)',
                },
              }}
            >
              Email: info@havenwellhealth.com
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQs;