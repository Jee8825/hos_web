import { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tooltip, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import * as Icons from '@mui/icons-material';
import { getServices, createService, updateService, deleteService } from '../services/api';
import socketService from '../services/socket';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', keyServices: '', iconName: 'FavoriteOutlined' });
  const [errors, setErrors] = useState({});

  const iconOptions = [
    'FavoriteOutlined', 'PsychologyOutlined', 'AccessibleOutlined', 'VisibilityOutlined',
    'HearingOutlined', 'PregnantWomanOutlined', 'ChildCareOutlined', 'LocalPharmacyOutlined',
    'SpaOutlined', 'PrecisionManufacturingOutlined', 'MonitorHeartOutlined', 'VaccinesOutlined'
  ];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  useEffect(() => {
    const handleServiceCreated = (service) => setServices(prev => [...prev, service]);
    const handleServiceUpdated = (service) => setServices(prev => prev.map(s => s._id === service._id ? service : s));
    const handleServiceDeleted = ({ id }) => setServices(prev => prev.filter(s => s._id !== id));

    socketService.on('service:created', handleServiceCreated);
    socketService.on('service:updated', handleServiceUpdated);
    socketService.on('service:deleted', handleServiceDeleted);

    return () => {
      socketService.off('service:created', handleServiceCreated);
      socketService.off('service:updated', handleServiceUpdated);
      socketService.off('service:deleted', handleServiceDeleted);
    };
  }, []);

  const validateServiceForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Service name is required';
    else if (formData.title.trim().length < 3) newErrors.title = 'Service name must be at least 3 characters';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (!formData.keyServices.trim()) newErrors.keyServices = 'At least one key service is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddService = async () => {
    if (!validateServiceForm()) return;
    
    const titleExists = services.some(s => s.title.toLowerCase() === formData.title.trim().toLowerCase());
    if (titleExists) {
      setErrors({ submit: 'A service with this title already exists.' });
      return;
    }
    
    try {
      await createService({
        title: formData.title.trim(),
        description: formData.description.trim(),
        keyServices: formData.keyServices.split(',').map(f => f.trim()).filter(f => f),
        iconName: formData.iconName
      });
      setFormData({ title: '', description: '', keyServices: '', iconName: 'FavoriteOutlined' });
      setErrors({});
      setOpenAdd(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to add service' });
    }
  };

  const handleEditService = async () => {
    if (!validateServiceForm()) return;
    try {
      await updateService(selectedService._id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        keyServices: formData.keyServices.split(',').map(f => f.trim()).filter(f => f),
        iconName: formData.iconName
      });
      setErrors({});
      setOpenEdit(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to update service' });
    }
  };

  const handleDeleteService = async () => {
    try {
      await deleteService(selectedService._id);
      setOpenDelete(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to delete service' });
    }
  };

  const openEditDialog = (service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      keyServices: Array.isArray(service.keyServices) ? service.keyServices.join(', ') : '',
      iconName: service.iconName,
    });
    setOpenEdit(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 3, md: 4 }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Typography variant="h4" sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
          Service Management
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
            fontSize: { xs: '0.875rem', md: '1rem' },
            '&:hover': { bgcolor: '#D89002', transform: 'translateY(-2px)' },
            transition: 'all 0.3s ease',
          }}
        >
          Add Service
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: { xs: '15px', md: '20px' }, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#A51C30' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', fontSize: { xs: '0.875rem', md: '1rem' }, py: { xs: 1.5, md: 2 } }}>Service Name</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', fontSize: { xs: '0.875rem', md: '1rem' }, py: { xs: 1.5, md: 2 }, display: { xs: 'none', md: 'table-cell' } }}>Description</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', fontSize: { xs: '0.875rem', md: '1rem' }, py: { xs: 1.5, md: 2 } }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service._id} sx={{ '&:hover': { bgcolor: '#FF7E7E10' } }}>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', fontSize: { xs: '0.875rem', md: '1rem' }, py: { xs: 1, md: 1.5 } }}>
                  <Box>{service.title}</Box>
                  <Box sx={{ display: { xs: 'block', md: 'none' }, fontSize: '0.75rem', color: '#666', mt: 0.5 }}>{service.description.substring(0, 40)}...</Box>
                </TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', fontSize: { xs: '0.875rem', md: '1rem' }, py: { xs: 1, md: 1.5 }, display: { xs: 'none', md: 'table-cell' } }}>{service.description.substring(0, 50)}...</TableCell>
                <TableCell align="center" sx={{ py: { xs: 1, md: 1.5 } }}>
                  <Tooltip title="Show Details">
                    <IconButton onClick={() => { setSelectedService(service); setOpenDetails(true); }} sx={{ color: '#F0A202' }}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => openEditDialog(service)} sx={{ color: '#666' }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => { setSelectedService(service); setOpenDelete(true); }} sx={{ color: '#A51C30' }}>
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
      <Dialog open={openAdd} onClose={() => { setOpenAdd(false); setErrors({}); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: { xs: '15px', md: '20px' }, m: { xs: 2, md: 3 } } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>Add New Service</DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 } }}>
          {errors.submit && <Alert severity="error" sx={{ mt: 2, mb: 2, borderRadius: '10px' }}>{errors.submit}</Alert>}
          <TextField fullWidth label="Service Name" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} error={!!errors.title} helperText={errors.title} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="Description" multiline rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} error={!!errors.description} helperText={errors.description} sx={{ mb: 2 }} />
          <TextField fullWidth label="Key Services (comma separated)" value={formData.keyServices} onChange={(e) => setFormData({ ...formData, keyServices: e.target.value })} error={!!errors.keyServices} helperText={errors.keyServices} sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel>Icon</InputLabel>
            <Select value={formData.iconName} onChange={(e) => setFormData({ ...formData, iconName: e.target.value })} label="Icon">
              {iconOptions.map((icon) => {
                const IconComponent = Icons[icon];
                return (
                  <MenuItem key={icon} value={icon}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {IconComponent && <IconComponent />}
                      <span>{icon}</span>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => { setOpenAdd(false); setErrors({}); }} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleAddService} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => { setOpenEdit(false); setErrors({}); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: { xs: '15px', md: '20px' }, m: { xs: 2, md: 3 } } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>Edit Service</DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 } }}>
          {errors.submit && <Alert severity="error" sx={{ mt: 2, mb: 2, borderRadius: '10px' }}>{errors.submit}</Alert>}
          <TextField fullWidth label="Service Name" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} error={!!errors.title} helperText={errors.title} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="Description" multiline rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} error={!!errors.description} helperText={errors.description} sx={{ mb: 2 }} />
          <TextField fullWidth label="Key Services (comma separated)" value={formData.keyServices} onChange={(e) => setFormData({ ...formData, keyServices: e.target.value })} error={!!errors.keyServices} helperText={errors.keyServices} sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel>Icon</InputLabel>
            <Select value={formData.iconName} onChange={(e) => setFormData({ ...formData, iconName: e.target.value })} label="Icon">
              {iconOptions.map((icon) => {
                const IconComponent = Icons[icon];
                return (
                  <MenuItem key={icon} value={icon}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {IconComponent && <IconComponent />}
                      <span>{icon}</span>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => { setOpenEdit(false); setErrors({}); }} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleEditService} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: { xs: '15px', md: '20px' }, m: { xs: 2, md: 3 } } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>Service Details</DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 } }}>
          {selectedService && (
            <Box sx={{ py: 2 }}>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}><strong>Title:</strong> {selectedService.title}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}><strong>Description:</strong> {selectedService.description}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1, fontSize: { xs: '0.875rem', md: '1rem' } }}><strong>Key Services:</strong></Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                {Array.isArray(selectedService.keyServices) && selectedService.keyServices.map((feature, idx) => (
                  <Typography component="li" key={idx} sx={{ fontFamily: '"Noto Serif Georgian", serif', fontSize: { xs: '0.875rem', md: '1rem' } }}>{feature}</Typography>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDetails(false)} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: { xs: '15px', md: '20px' }, m: { xs: 2, md: 3 } } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 } }}>
          <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', fontSize: { xs: '0.875rem', md: '1rem' } }}>
            Are you sure you want to delete <strong>{selectedService?.title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDelete(false)} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleDeleteService} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServiceManagement;
