import { Box, Container, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

const PrivacyPolicyPage = () => {
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
            <SecurityIcon sx={{ fontSize: 60, mb: 2, color: '#F0A202' }} />
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Viga", sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              Privacy Policy
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
              At HavenWell Health, we are committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our facilities, use our services, or interact with our website and mobile applications.
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
              1. Information We Collect
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
              We collect various types of information to provide and improve our healthcare services:
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
                <strong>Personal Information:</strong> Name, date of birth, gender, contact details, identification documents, and emergency contact information.
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
                <strong>Medical Information:</strong> Medical history, symptoms, diagnosis, treatment records, prescriptions, laboratory results, imaging reports, and insurance information.
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
                <strong>Financial Information:</strong> Payment details, billing information, and insurance coverage details for processing payments and insurance claims.
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
                <strong>Technical Information:</strong> IP address, browser type, device information, and usage data when you interact with our digital platforms.
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
              2. How We Use Your Information
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
              Your information is used exclusively for legitimate healthcare purposes:
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
                Providing medical treatment, diagnosis, and healthcare services
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
                Maintaining accurate medical records and continuity of care
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
                Processing payments and managing insurance claims
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
                Scheduling appointments and sending appointment reminders
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
                Improving healthcare quality and conducting medical research (with proper consent)
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
                Complying with legal and regulatory requirements
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
              3. Information Sharing and Disclosure
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
              We respect your privacy and limit information sharing to essential circumstances:
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
                <strong>Healthcare Providers:</strong> Information shared with doctors, nurses, specialists, and other healthcare professionals directly involved in your care.
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
                <strong>Insurance Companies:</strong> Necessary information shared for processing claims and verifying coverage.
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
                <strong>Legal Requirements:</strong> Disclosure when required by law, court orders, or regulatory authorities.
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
                <strong>Business Associates:</strong> Trusted third-party service providers who assist in operations, bound by strict confidentiality agreements.
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
              4. Data Security
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
              We implement robust security measures to protect your information including encrypted databases, secure access controls, regular security audits, staff training on privacy protocols, and firewall protection for digital systems. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
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
              5. Your Rights
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
              You have the following rights regarding your personal and medical information:
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
                Access and review your medical records
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
                Request corrections to inaccurate information
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
                Receive a copy of your health records
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
                Request restrictions on certain uses or disclosures
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
                Withdraw consent for non-essential uses (where applicable)
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
              6. Children's Privacy
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
              Our services may be used by minors with parental or guardian consent. We collect and maintain pediatric health records in accordance with applicable laws. Parents and guardians have the right to access their child's medical information and make decisions regarding its use and disclosure.
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
              7. Cookies and Tracking Technologies
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
              Our website uses cookies and similar technologies to enhance user experience, analyze site usage, and provide personalized content. You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.
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
              8. Changes to This Policy
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
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes through our website or direct communication. The "Last Updated" date at the top indicates when the policy was last revised.
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
              9. Contact Us
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
              If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact our Privacy Officer:
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
                <strong>HavenWell Health - Privacy Department</strong>
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Serif Georgian", serif',
                  color: '#666',
                  mb: 1,
                }}
              >
                Email: privacy@havenwellhealth.com
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

export default PrivacyPolicyPage;