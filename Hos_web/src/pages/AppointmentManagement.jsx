import { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tooltip, Alert, MenuItem, Tabs, Tab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment, getServices } from '../services/api';
import socketService from '../services/socket';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('pending');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', serviceRef: '', date: '', time: '', status: 'pending', details: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadAppointments(status);
    loadServices();
  }, [status]);

  const loadAppointments = async (filterStatus) => {
    try {
      const response = await getAppointments(filterStatus);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const loadServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  useEffect(() => {
    const handleAppointmentCreated = (appointment) => {
      if (appointment.status === status) setAppointments(prev => [...prev, appointment]);
    };
    const handleAppointmentUpdated = (appointment) => {
      if (appointment.status === status) {
        setAppointments(prev => prev.map(a => a._id === appointment._id ? appointment : a));
      } else {
        setAppointments(prev => prev.filter(a => a._id !== appointment._id));
      }
    };
    const handleAppointmentDeleted = ({ id }) => setAppointments(prev => prev.filter(a => a._id !== id));

    socketService.on('appointment:created', handleAppointmentCreated);
    socketService.on('appointment:updated', handleAppointmentUpdated);
    socketService.on('appointment:deleted', handleAppointmentDeleted);

    return () => {
      socketService.off('appointment:created', handleAppointmentCreated);
      socketService.off('appointment:updated', handleAppointmentUpdated);
      socketService.off('appointment:deleted', handleAppointmentDeleted);
    };
  }, [status]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.serviceRef) newErrors.serviceRef = 'Service is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAppointment = async () => {
    if (!validateForm()) return;
    
    const userActiveAppointments = appointments.filter(a => 
      a.email.toLowerCase() === formData.email.toLowerCase() && 
      (a.status === 'pending' || a.status === 'postponed')
    ).length;
    
    if (userActiveAppointments >= 6) {
      setErrors({ submit: 'Maximum 6 active appointments allowed per user. Please complete or cancel existing appointments.' });
      return;
    }
    
    try {
      await createAppointment(formData);
      setFormData({ name: '', email: '', phone: '', serviceRef: '', date: '', time: '', status: 'pending', details: '' });
      setErrors({});
      setOpenAdd(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to add appointment' });
    }
  };

  const handleEditAppointment = async () => {
    if (!validateForm()) return;
    try {
      await updateAppointment(selectedAppointment._id, formData);
      setErrors({});
      setOpenEdit(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to update appointment' });
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointment(selectedAppointment._id);
      setOpenDelete(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to delete appointment' });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 3, md: 4 }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Typography variant="h4" sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
          Appointment Management
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}
          sx={{
            bgcolor: '#F0A202',
            color: '#fff',
            fontFamily: '"Viga", sans-serif',
            px: { xs: 2, md: 3 },
            py: { xs: 0.75, md: 1 },
            borderRadius: '25px',
            '&:hover': { bgcolor: '#D89002' },
          }}
        >
          Add Appointment
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={status} 
          onChange={(e, newValue) => setStatus(newValue)} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ '& .MuiTab-root': { fontFamily: '"Viga", sans-serif' } }}
        >
          <Tab label="Pending" value="pending" />
          <Tab label="Postponed" value="postponed" />
          <Tab label="Completed" value="completed" />
          <Tab label="Cancelled" value="cancelled" />
        </Tabs>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: { xs: '15px', md: '20px' }, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#A51C30' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', display: { xs: 'none', md: 'table-cell' } }}>Phone</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', display: { xs: 'none', sm: 'table-cell' } }}>Service</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif' }}>Date</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', display: { xs: 'none', md: 'table-cell' } }}>Time</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontFamily: '"Viga", sans-serif' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id} sx={{ '&:hover': { bgcolor: '#FF7E7E10' } }}>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif' }}>{appointment.name}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', display: { xs: 'none', md: 'table-cell' } }}>{appointment.phone}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', display: { xs: 'none', sm: 'table-cell' } }}>{appointment.serviceRef?.title || 'N/A'}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif' }}>{appointment.date}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', display: { xs: 'none', md: 'table-cell' } }}>{appointment.time}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Details">
                    <IconButton onClick={() => { setSelectedAppointment(appointment); setOpenDetails(true); }} sx={{ color: '#F0A202' }}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                    <Tooltip title="Cancel">
                      <IconButton onClick={async () => { await updateAppointment(appointment._id, { status: 'cancelled' }); }} sx={{ color: '#FF7E7E' }}>
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Edit">
                    <IconButton onClick={() => { setSelectedAppointment(appointment); setFormData({ ...appointment, serviceRef: appointment.serviceRef?._id || '' }); setOpenEdit(true); }} sx={{ color: '#666' }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => { setSelectedAppointment(appointment); setOpenDelete(true); }} sx={{ color: '#A51C30' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => { setOpenAdd(false); setErrors({}); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Add New Appointment</DialogTitle>
        <DialogContent>
          {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}
          <TextField fullWidth label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={!!errors.name} helperText={errors.name} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} error={!!errors.phone} helperText={errors.phone} sx={{ mb: 2 }} />
          <TextField fullWidth select label="Service" value={formData.serviceRef} onChange={(e) => setFormData({ ...formData, serviceRef: e.target.value })} error={!!errors.serviceRef} helperText={errors.serviceRef} sx={{ mb: 2 }}>
            {services.map((service) => (
              <MenuItem key={service._id} value={service._id}>{service.title}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} error={!!errors.date} helperText={errors.date} InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
          <TextField fullWidth label="Time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} error={!!errors.time} helperText={errors.time} InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
          <TextField fullWidth select label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} sx={{ mb: 2 }}>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="postponed">Postponed</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
          <TextField fullWidth label="Details" multiline rows={3} value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => { setOpenAdd(false); setErrors({}); }} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleAddAppointment} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => { setOpenEdit(false); setErrors({}); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Edit Appointment</DialogTitle>
        <DialogContent>
          {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}
          <TextField fullWidth label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={!!errors.name} helperText={errors.name} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} error={!!errors.phone} helperText={errors.phone} sx={{ mb: 2 }} />
          <TextField fullWidth select label="Service" value={formData.serviceRef} onChange={(e) => setFormData({ ...formData, serviceRef: e.target.value })} error={!!errors.serviceRef} helperText={errors.serviceRef} sx={{ mb: 2 }}>
            {services.map((service) => (
              <MenuItem key={service._id} value={service._id}>{service.title}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} error={!!errors.date} helperText={errors.date} InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
          <TextField fullWidth label="Time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} error={!!errors.time} helperText={errors.time} InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
          <TextField fullWidth select label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} sx={{ mb: 2 }}>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="postponed">Postponed</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
          <TextField fullWidth label="Details" multiline rows={3} value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => { setOpenEdit(false); setErrors({}); }} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleEditAppointment} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Appointment Details</DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <Box sx={{ py: 2 }}>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Name:</strong> {selectedAppointment.name}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Email:</strong> {selectedAppointment.email}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Phone:</strong> {selectedAppointment.phone}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Service:</strong> {selectedAppointment.serviceRef?.title || 'N/A'}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Date:</strong> {selectedAppointment.date}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Time:</strong> {selectedAppointment.time}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Status:</strong> {selectedAppointment.status}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Details:</strong> {selectedAppointment.details || 'N/A'}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDetails(false)} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif' }}>
            Are you sure you want to delete this appointment for <strong>{selectedAppointment?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDelete(false)} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleDeleteAppointment} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentManagement;
