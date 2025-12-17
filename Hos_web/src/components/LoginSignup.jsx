import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserInfo } from '../utils/localStorage';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';

const LoginSignup = ({ isLogin, onSwitchToLogin, onSwitchToSignup, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [predictedRole, setPredictedRole] = useState('patient');

  const validateEmail = (email) => {
    // RFC 5322 compliant email validation
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, max 128, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\[\]{}|;:'",.<>\/\\`~-])[A-Za-z\d@$!%*?&#^()_+=\[\]{}|;:'",.<>\/\\`~-]{8,128}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    // Must be exactly 10 digits starting with 6-9 (Indian standard)
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    return /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value.trim())) {
          error = 'Name must contain only letters, spaces, hyphens, apostrophes, and periods';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          error = 'Name must not exceed 100 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (!validatePassword(value)) {
          error = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!validatePhone(value)) {
          error = 'Phone number must be 10 digits starting with 6, 7, 8, or 9';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = isLogin
      ? ['email', 'password']
      : ['name', 'email', 'phone', 'password', 'confirmPassword'];

    const newErrors = {};
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        if (isLogin) {
          const user = await login({ email: formData.email, password: formData.password });
          
          // Save user info for prefill on login too
          updateUserInfo({
            name: user.name,
            email: user.email,
            phone: formData.phone || ''
          });
          
          setSubmitSuccess(true);
          setTimeout(() => {
            onClose();
            if (user.role === 'admin') {
              window.location.href = '/admin';
            } else {
              window.location.reload();
            }
          }, 1500);
        } else {
          const user = await signup({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
          });
          
          // Save user info for form prefill
          updateUserInfo({
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          });
          
          setSubmitSuccess(true);
          setTimeout(() => {
            onClose();
            if (user.role === 'admin') {
              window.location.href = '/admin';
            } else {
              window.location.reload();
            }
          }, 1500);
        }
      } catch (error) {
        const message = error.response?.data?.message || (isLogin ? 'Invalid email or password' : 'Sign up failed');
        setErrors({ submit: message });
        if (message.includes('removed by admin')) {
          setTimeout(() => onSwitchToSignup(), 2000);
        }
      }
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    // Simulate password reset
    setSubmitSuccess(true);
    setErrors({ submit: 'Password reset link has been sent to your email' });
    setTimeout(() => {
      setShowForgotPassword(false);
      setSubmitSuccess(false);
      setErrors({});
    }, 3000);
  };

  if (showForgotPassword) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Viga", sans-serif',
            color: '#A51C30',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Forgot Password?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"Noto Serif Georgian", serif',
            color: '#666',
            mb: 4,
            textAlign: 'center',
          }}
        >
          Enter your email address and we'll send you a link to reset your password.
        </Typography>

        {errors.submit && (
          <Alert severity={submitSuccess ? 'success' : 'error'} sx={{ mb: 3, borderRadius: '15px' }}>
            {errors.submit}
          </Alert>
        )}

        <form onSubmit={handleForgotPassword}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#F0A202' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                fontFamily: '"Noto Serif Georgian", serif',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#A51C30',
              color: '#fff',
              fontFamily: '"Viga", sans-serif',
              py: 1.5,
              fontSize: '1rem',
              borderRadius: '25px',
              mb: 2,
              '&:hover': {
                bgcolor: '#8B1628',
              },
            }}
          >
            Send Reset Link
          </Button>

          <Button
            fullWidth
            onClick={() => {
              setShowForgotPassword(false);
              setErrors({});
            }}
            sx={{
              color: '#A51C30',
              fontFamily: '"Noto Serif Georgian", serif',
            }}
          >
            Back to Login
          </Button>
        </form>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 5 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Viga", sans-serif',
          color: '#A51C30',
          mb: 1,
          textAlign: 'center',
        }}
      >
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: '"Noto Serif Georgian", serif',
          color: '#666',
          mb: 4,
          textAlign: 'center',
        }}
      >
        {isLogin ? 'Sign in to access your account' : 'Join HavenWell Health today'}
      </Typography>

      {isLogin && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: '15px', bgcolor: '#F0A20210' }}>
          <Typography variant="body2" sx={{ fontFamily: '"Noto Serif Georgian", serif', fontWeight: 600, mb: 0.5 }}>
            Admin Credentials:
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: '"Noto Serif Georgian", serif', display: 'block' }}>
            admin@hospital.com / Admin@123
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: '"Noto Serif Georgian", serif', display: 'block' }}>
            suryasekar626@gmail.com / Surya@123
          </Typography>
        </Alert>
      )}

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: '15px' }}>
          {isLogin ? 'Login successful!' : 'Account created successfully!'}
        </Alert>
      )}

      {errors.submit && !submitSuccess && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '15px' }}>
          {errors.submit}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#F0A202' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '15px',
                  fontFamily: '"Noto Serif Georgian", serif',
                },
              }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: '#F0A202' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '15px',
                  fontFamily: '"Noto Serif Georgian", serif',
                },
              }}
            />
          </>
        )}

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email || (!isLogin && formData.email ? `Account type: ${predictedRole.charAt(0).toUpperCase() + predictedRole.slice(1)}` : '')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: '#F0A202' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '15px',
              fontFamily: '"Noto Serif Georgian", serif',
            },
            '& .MuiFormHelperText-root': {
              color: predictedRole !== 'patient' ? '#F0A202' : 'inherit'
            }
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: '#F0A202' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '15px',
              fontFamily: '"Noto Serif Georgian", serif',
            },
          }}
        />

        {!isLogin && (
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#F0A202' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                fontFamily: '"Noto Serif Georgian", serif',
              },
            }}
          />
        )}

        {isLogin && (
          <Box sx={{ textAlign: 'right', mb: 3 }}>
            <MuiLink
              component="button"
              type="button"
              onClick={() => setShowForgotPassword(true)}
              sx={{
                color: '#F0A202',
                fontFamily: '"Noto Serif Georgian", serif',
                fontSize: '0.9rem',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot Password?
            </MuiLink>
          </Box>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            bgcolor: '#A51C30',
            color: '#fff',
            fontFamily: '"Viga", sans-serif',
            py: 1.5,
            fontSize: '1rem',
            borderRadius: '25px',
            mb: 3,
            '&:hover': {
              bgcolor: '#8B1628',
            },
          }}
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Noto Serif Georgian", serif',
              color: '#666',
              display: 'inline',
            }}
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </Typography>
          <MuiLink
            component="button"
            type="button"
            onClick={isLogin ? onSwitchToSignup : onSwitchToLogin}
            sx={{
              color: '#F0A202',
              fontFamily: '"Noto Serif Georgian", serif',
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </MuiLink>
        </Box>
      </form>
    </Box>
  );
};

export default LoginSignup;