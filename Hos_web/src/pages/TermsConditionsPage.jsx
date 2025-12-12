import { Box, Container, Typography } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

const TermsConditionsPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#A51C30',
          color: '#fff',
          py: 6,
          mt: { xs: 7, md: 8 },
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center' }}>
            <GavelIcon sx={{ fontSize: 60, mb: 2, color: '#F0A202' }} />
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Viga", sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              Terms & Conditions
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                fontSize: { xs: '1rem', md: '1.1rem' },
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.95,
              }}
            >
              Last Updated: December 9, 2024
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: 8, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="md">
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: '25px',
              p: { xs: 3, md: 5 },
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 4,
                lineHeight: 1.8,
                fontSize: '1.05rem',
              }}
            >
              Welcome to HavenWell Health. These Terms and Conditions govern your use of our healthcare services, facilities, website, and mobile applications. By accessing our services, you agree to comply with and be bound by these terms. Please read them carefully before using our services.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              1. Acceptance of Terms
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              By registering as a patient, scheduling appointments, using our facilities, or accessing our digital platforms, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree with any part of these terms, please do not use our services.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              2. Services Provided
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 2,
                lineHeight: 1.8,
              }}
            >
              HavenWell Health provides comprehensive healthcare services including but not limited to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Outpatient consultations across multiple specialties
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Inpatient hospitalization and surgical procedures
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Emergency and critical care services
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Diagnostic services including laboratory and imaging
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Preventive health checkups and wellness programs
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Telemedicine consultations
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              3. Patient Responsibilities
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 2,
                lineHeight: 1.8,
              }}
            >
              As a patient at HavenWell Health, you agree to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Provide accurate and complete medical history and personal information
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Follow the treatment plans and medical advice provided by healthcare professionals
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Inform healthcare providers of any allergies, medications, or pre-existing conditions
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Arrive on time for scheduled appointments or notify us of cancellations
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Respect hospital staff, other patients, and facility property
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Settle all financial obligations in accordance with our billing policies
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              4. Appointments and Cancellations
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 2,
                lineHeight: 1.8,
              }}
            >
              Appointment scheduling is subject to availability. We request at least 24 hours' notice for appointment cancellations or rescheduling. Repeated no-shows or late cancellations may result in restrictions on future appointment scheduling. Emergency cases will always receive priority attention regardless of scheduled appointments.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              5. Payment and Billing
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 2,
                lineHeight: 1.8,
              }}
            >
              Payment terms and conditions:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Patients are responsible for all charges incurred during treatment
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Payment is expected at the time of service unless prior arrangements are made
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                We accept cash, credit cards, debit cards, and most major insurance plans
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Insurance verification is the patient's responsibility; any uncovered amounts are patient's obligation
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                  lineHeight: 1.8,
                }}
              >
                Medical records will be released only after all outstanding bills are settled
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              6. Medical Records and Confidentiality
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              All medical records are maintained in accordance with applicable healthcare regulations and privacy laws. Patients have the right to access their medical records upon request. We maintain strict confidentiality of all patient information and will only disclose it with patient consent or as required by law. Medical records are the property of HavenWell Health but patients are entitled to copies.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              7. Limitation of Liability
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              While we strive for the highest standards of care, HavenWell Health and its healthcare professionals are not liable for adverse outcomes that result from the inherent risks of medical treatment, patient non-compliance with medical advice, or circumstances beyond our reasonable control. Our liability is limited to direct damages and governed by applicable medical malpractice and healthcare laws.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              8. Informed Consent
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Before any medical procedure, treatment, or surgery, patients will be provided with detailed information about the procedure, potential risks, benefits, and alternatives. Your signed consent is required before proceeding with any significant medical intervention. You have the right to refuse treatment or withdraw consent at any time, understanding the potential consequences of such decisions.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              9. Visitor Policy
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Visitor access is subject to hospital policies and may be restricted in certain areas such as ICU, operation theaters, and isolation wards. Visitors must comply with hospital regulations, maintain quiet hours, and follow infection control protocols. The hospital reserves the right to restrict or deny visitor access to ensure patient safety and care quality.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              10. Website and Digital Services
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Our website and mobile applications are provided for informational purposes and appointment scheduling. The information provided should not replace professional medical advice. We reserve the right to modify, suspend, or discontinue any digital service without notice. Users must not misuse our digital platforms for unauthorized purposes or attempt to breach security measures.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              11. Intellectual Property
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              All content on our website, including text, graphics, logos, images, and software, is the property of HavenWell Health and protected by intellectual property laws. Unauthorized use, reproduction, or distribution of our content is strictly prohibited.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              12. Changes to Terms
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              HavenWell Health reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the revised terms. We encourage you to review these terms periodically.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              13. Governing Law
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Viga", sans-serif',
                color: '#A51C30',
                mb: 2,
                mt: 4,
              }}
            >
              14. Contact Information
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Noto Serif Georgian", serif',
                color: '#666',
                mb: 1,
                lineHeight: 1.8,
              }}
            >
              For questions or concerns about these Terms and Conditions, please contact:
            </Typography>
            <Box
              sx={{
                bgcolor: '#FF7E7E10',
                p: 3,
                borderRadius: '15px',
                mt: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                }}
              >
                <strong>HavenWell Health - Legal Department</strong>
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                }}
              >
                Email: legal@havenwellhealth.com
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                }}
              >
                Phone: +91 1800-123-4567
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                }}
              >
                Address: 123 Marine Drive, Andheri West, Mumbai - 400058
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default TermsConditionsPage;