import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Validation requirements display component
export const ValidationRequirements = ({ requirements, values }) => {
  return (
    <Box sx={{ 
      mt: 1, 
      p: 2, 
      bgcolor: '#F9F9F9', 
      borderRadius: '12px',
      border: '1px solid #E0E0E0'
    }}>
      <Typography sx={{ 
        fontFamily: '"Viga", sans-serif', 
        fontSize: '0.9rem', 
        color: '#A51C30',
        mb: 1
      }}>
        Requirements:
      </Typography>
      {requirements.map((req, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          {req.test(values) ? (
            <CheckCircleIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
          ) : (
            <CancelIcon sx={{ fontSize: 16, color: '#FF7E7E' }} />
          )}
          <Typography sx={{ 
            fontFamily: '"Noto Serif Georgian", serif', 
            fontSize: '0.85rem',
            color: req.test(values) ? '#4CAF50' : '#666'
          }}>
            {req.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

// Field helper tooltip
export const FieldHelper = ({ title, tips }) => {
  return (
    <Tooltip
      title={
        <Box sx={{ p: 1 }}>
          <Typography sx={{ 
            fontFamily: '"Viga", sans-serif', 
            fontSize: '0.9rem',
            mb: 1,
            color: '#F0A202'
          }}>
            {title}
          </Typography>
          {tips.map((tip, index) => (
            <Typography key={index} sx={{ 
              fontFamily: '"Noto Serif Georgian", serif', 
              fontSize: '0.8rem',
              mb: 0.5
            }}>
              • {tip}
            </Typography>
          ))}
        </Box>
      }
      arrow
      placement="right"
      sx={{
        '& .MuiTooltip-tooltip': {
          bgcolor: '#333',
          maxWidth: 300,
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        },
        '& .MuiTooltip-arrow': {
          color: '#333'
        }
      }}
    >
      <IconButton size="small" sx={{ ml: 0.5, color: '#F0A202' }}>
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

// Password requirements
export const passwordRequirements = [
  { label: 'At least 8 characters', test: (val) => val.length >= 8 },
  { label: 'One uppercase letter (A-Z)', test: (val) => /[A-Z]/.test(val) },
  { label: 'One lowercase letter (a-z)', test: (val) => /[a-z]/.test(val) },
  { label: 'One number (0-9)', test: (val) => /\d/.test(val) },
  { label: 'One special character (!@#$%...)', test: (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val) }
];

// Phone requirements
export const phoneRequirements = [
  { label: 'Exactly 10 digits', test: (val) => /^\d{10}$/.test(val.replace(/[\s\-()]/g, '')) },
  { label: 'Starts with 6, 7, 8, or 9', test: (val) => /^[6-9]/.test(val.replace(/[\s\-()]/g, '')) }
];

// Field helpers data
export const fieldHelpers = {
  phone: {
    title: '📱 Phone Number Format',
    tips: [
      'Must be exactly 10 digits',
      'Must start with 6, 7, 8, or 9',
      'Example: 9876543210',
      'Spaces and dashes are allowed: 987-654-3210'
    ]
  },
  password: {
    title: '🔒 Password Requirements',
    tips: [
      'Minimum 8 characters long',
      'Include uppercase and lowercase letters',
      'Include at least one number',
      'Include at least one special character',
      'Example: MyPass@123'
    ]
  },
  email: {
    title: '📧 Email Format',
    tips: [
      'Must be a valid email address',
      'Example: user@example.com',
      'No spaces allowed'
    ]
  },
  name: {
    title: '👤 Name Format',
    tips: [
      'Minimum 2 characters',
      'Only letters, spaces, hyphens allowed',
      'Example: John Doe'
    ]
  }
};
