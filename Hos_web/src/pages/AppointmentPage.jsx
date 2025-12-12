import { useState, useEffect } from 'react';
import { createAppointment, getServices } from '../services/api';
import { getRandomBanner } from '../utils/bannerUtils';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DateRangeIcon from '@mui/icons-material/DateRange'; 

const AppointmentPage = () => {
  const [bannerImage] = useState(getRandomBanner());
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    department: '',
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const locations = [
    'Mumbai (Main Branch)',
    'Chennai',
    'Delhi',
    'Kolkata',
    'Bangalore',
    'Madurai',
    'Nellore',
    'Bhopal',
    'Kochi',
  ];

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];

  // Validation logic (kept the same)
  const validateField = (name, value) => {
    let error = '';
    // ... (rest of validation logic is omitted for brevity)
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = 'This field is required';
        } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value.trim())) {
          error = 'Name must contain only letters, spaces, hyphens, apostrophes, and periods';
        } else if (value.trim().length < 2 || value.trim().length > 50) {
          error = 'Name must be between 2-50 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(value.replace(/\s/g, ''))) {
          error = 'Please enter a valid 10-digit Indian phone number starting with 6-9';
        }
        break;

      case 'dateOfBirth':
        if (!value) {
          error = 'Date of birth is required';
        } else {
          const dob = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (dob > today) { 
            error = 'Date of birth cannot be in the future';
          }
        }
        break;

      case 'appointmentDate':
        if (!value) {
          error = 'Appointment date is required';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            error = 'Appointment date cannot be in the past';
          }
        }
        break;

      case 'gender':
      case 'location':
      case 'department':
      case 'appointmentTime':
        if (!value) {
          error = 'This field is required';
        }
        break;

      case 'reason':
        if (!value.trim()) {
          error = 'Please provide a reason for your visit';
        } else if (value.trim().length < 5) {
          error = 'Reason must be at least 5 characters';
        } else if (value.trim().length > 500) {
          error = 'Reason must not exceed 500 characters';
        }
        break;

      case 'doctor':
        if (value && value.trim() && !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value.trim())) {
          error = 'Doctor name must contain only letters, spaces, hyphens, apostrophes, and periods';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await createAppointment({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          serviceRef: formData.department,
          date: formData.appointmentDate,
          time: formData.appointmentTime,
          details: `DOB: ${formData.dateOfBirth}, Gender: ${formData.gender}, Location: ${formData.location}, Doctor: ${formData.doctor || 'Any'}, Reason: ${formData.reason}`
        });
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: '',
          location: '',
          department: '',
          doctor: '',
          appointmentDate: '',
          appointmentTime: '',
          reason: '',
        });
        setErrors({});
        setSubmitSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        console.error('Error creating appointment:', error);
        setErrors({ submit: error.response?.data?.message || 'Failed to book appointment. Please try again.' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Define shared styling for all text fields
  const textFieldStyles = {
    // Ensures fields have consistent vertical alignment and appearance
    '& .MuiOutlinedInput-root': {
      borderRadius: '15px',
      fontFamily: '"Noto Serif Georgian", serif',
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      bgcolor: 'white', // Ensure fields stand out against the background
      '&.Mui-focused': {
        borderColor: '#A51C30',
        boxShadow: '0 0 0 4px rgba(165, 28, 48, 0.2)',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#A51C30',
    },
    '& .MuiFormHelperText-root': {
        fontFamily: '"Noto Serif Georgian", serif',
    },
  };

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
            <CalendarMonthIcon sx={{ fontSize: 60, mb: 2, color: '#F0A202' }} />
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Viga", sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              Book an Appointment
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
              Schedule your consultation with our expert medical team. We're here to provide you with the best healthcare services.
            </Typography>
          </Box>
        </Container>
        </Container>
      </Box>

      {/* Appointment Form */}
      <Box sx={{ py: 8, bgcolor: '#F9F9F9' }}>
        <Container maxWidth="lg">
          {submitSuccess && (
            <Alert
              severity="success"
              sx={{
                mb: 4,
                borderRadius: '15px',
                fontFamily: '"Noto Serif Georgian", serif',
              }}
            >
              Your appointment has been successfully booked! We will send you a confirmation email shortly.
            </Alert>
          )}
          
          {errors.submit && (
            <Alert
              severity="error"
              sx={{
                mb: 4,
                borderRadius: '15px',
                fontFamily: '"Noto Serif Georgian", serif',
              }}
            >
              {errors.submit}
            </Alert>
          )}

          <Card
            sx={{
              borderRadius: '25px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <form onSubmit={handleSubmit}>
                
                {/* === 1. Personal Information Grid === */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  
                  {/* Section Header */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, pb: 0.5, borderBottom: '2px solid #F0A202' }}>
                      <PersonIcon sx={{ color: '#A51C30', fontSize: '1.8rem' }} />
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Viga", sans-serif',
                          color: '#A51C30',
                        }}
                      >
                        Personal Information
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Name Fields */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name *"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      required
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name *"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      required
                      sx={textFieldStyles}
                    />
                  </Grid>

                  {/* Contact Fields */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      InputProps={{
                        startAdornment: <EmailIcon sx={{ color: '#F0A202', mr: 1 }} />,
                      }}
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number *"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      required
                      InputProps={{
                        startAdornment: <PhoneIcon sx={{ color: '#F0A202', mr: 1 }} />,
                      }}
                      sx={textFieldStyles}
                    />
                  </Grid>

                  {/* DOB and Gender */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth *"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth}
                      required
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        max: new Date().toISOString().split('T')[0],
                      }}
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Gender *"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      error={!!errors.gender}
                      helperText={errors.gender}
                      required
                      InputProps={{
                        startAdornment: <BadgeIcon sx={{ color: '#F0A202', mr: 1 }} />,
                      }}
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      sx={textFieldStyles}
                    >
                      <MenuItem value="">Select Gender</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                
                {/* === 2. Appointment Details Grid === */}
                <Grid container spacing={3}>
                  
                  {/* Section Header */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, pb: 0.5, borderBottom: '2px solid #F0A202' }}>
                      <LocalHospitalIcon sx={{ color: '#A51C30', fontSize: '1.8rem' }} />
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Viga", sans-serif',
                          color: '#A51C30',
                        }}
                      >
                        Appointment Details
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Location and Department */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Preferred Location *"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      error={!!errors.location}
                      helperText={errors.location}
                      required
                      InputProps={{
                        startAdornment: <LocationOnIcon sx={{ color: '#F0A202', mr: 1 }} />,
                      }}
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      sx={textFieldStyles}
                    >
                      <MenuItem value="">Select Location</MenuItem>
                      {locations.map((location) => (
                        <MenuItem key={location} value={location}>
                          {location}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Department *"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      error={!!errors.department}
                      helperText={errors.department}
                      required
                      InputProps={{
                        startAdornment: <LocalHospitalIcon sx={{ color: '#F0A202', mr: 1 }} />,
                      }}
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      sx={textFieldStyles}
                    >
                      <MenuItem value="">Select Department</MenuItem>
                      {services.map((service) => (
                        <MenuItem key={service._id} value={service._id}>
                          {service.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Date and Time */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Appointment Date *"
                      name="appointmentDate"
                      type="date"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      error={!!errors.appointmentDate}
                      helperText={errors.appointmentDate}
                      required
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                          startAdornment: <DateRangeIcon sx={{ color: '#F0A202', mr: 1 }} />,
                      }}
                      inputProps={{
                        min: new Date().toISOString().split('T')[0],
                      }}
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Preferred Time *"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      error={!!errors.appointmentTime}
                      helperText={errors.appointmentTime}
                      required
                      InputProps={{
                        startAdornment: <ScheduleIcon sx={{ color: '#F0A202', mr: 1 }} />,
                      }}
                      SelectProps={{ MenuProps: { disableScrollLock: true } }}
                      sx={textFieldStyles}
                    >
                      <MenuItem value="">Select Time</MenuItem>
                      {timeSlots.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  
                  {/* Preferred Doctor */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Preferred Doctor (Optional)"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      error={!!errors.doctor}
                      helperText={errors.doctor}
                      InputProps={{
                        startAdornment: <PersonIcon sx={{ color: '#F0A202', mr: 1 }} />,
                      }}
                      sx={textFieldStyles}
                    />
                  </Grid>

                  {/* Reason for Visit */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Reason for Visit *"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      error={!!errors.reason}
                      helperText={errors.reason || 'Please describe your symptoms or reason for consultation (e.g., routine check-up, persistent cough, follow-up).'}
                      required
                      sx={textFieldStyles}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: '#A51C30',
                        color: '#fff',
                        fontFamily: '"Viga", sans-serif',
                        fontSize: '1.2rem',
                        py: 1.5,
                        borderRadius: '30px',
                        mt: 3,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 6px 20px rgba(165, 28, 48, 0.4)',
                        '&:hover': {
                          bgcolor: '#8B1628',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 30px rgba(165, 28, 48, 0.6)',
                        },
                      }}
                    >
                      CONFIRM & BOOK APPOINTMENT
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* Additional Information Cards */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* Card 1: Flexible Scheduling */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: '20px',
                  bgcolor: '#FF7E7E10',
                  border: '2px solid #FF7E7E40',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
                  <CalendarMonthIcon sx={{ fontSize: 50, color: '#F0A202', mb: 2 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Viga", sans-serif',
                      color: '#A51C30',
                      mb: 1,
                    }}
                  >
                    Flexible Scheduling
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Noto Serif Georgian", serif',
                      color: '#666',
                      lineHeight: 1.7,
                    }}
                  >
                    Choose from multiple time slots that fit your schedule. Same-day appointments available for urgent cases.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 2: Expert Doctors */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: '20px',
                  bgcolor: '#F0A20210',
                  border: '2px solid #F0A20240',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
                  <LocalHospitalIcon sx={{ fontSize: 50, color: '#F0A202', mb: 2 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Viga", sans-serif',
                      color: '#A51C30',
                      mb: 1,
                    }}
                  >
                    Expert Doctors
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Noto Serif Georgian", serif',
                      color: '#666',
                      lineHeight: 1.7,
                    }}
                  >
                    Consult with our team of experienced specialists and general practitioners for comprehensive care.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 3: 24/7 Support */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: '20px',
                  bgcolor: '#A51C3010',
                  border: '2px solid #A51C3040',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
                  <PhoneIcon sx={{ fontSize: 50, color: '#F0A202', mb: 2 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Viga", sans-serif',
                      color: '#A51C30',
                      mb: 1,
                    }}
                  >
                    24/7 Support
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Noto Serif Georgian", serif',
                      color: '#666',
                      lineHeight: 1.7,
                    }}
                  >
                    Need help with booking? Call us at **1800-123-4567** anytime for assistance with your appointment.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AppointmentPage;