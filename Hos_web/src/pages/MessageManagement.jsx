import { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip, TextField } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getMessages, updateMessage, deleteMessage } from '../services/api';
import socketService from '../services/socket';

const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        newErrors.phone = 'Phone number must be 10 digits starting with 6, 7, 8, or 9';
      }
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await getMessages();
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    const handleMessageCreated = (message) => setMessages(prev => [message, ...prev]);
    const handleMessageUpdated = (message) => setMessages(prev => prev.map(m => m._id === message._id ? message : m));
    const handleMessageDeleted = ({ id }) => setMessages(prev => prev.filter(m => m._id !== id));

    socketService.on('message:created', handleMessageCreated);
    socketService.on('message:updated', handleMessageUpdated);
    socketService.on('message:deleted', handleMessageDeleted);

    return () => {
      socketService.off('message:created', handleMessageCreated);
      socketService.off('message:updated', handleMessageUpdated);
      socketService.off('message:deleted', handleMessageDeleted);
    };
  }, []);

  const handleEditMessage = async () => {
    if (!validateForm()) return;
    
    try {
      await updateMessage(selectedMessage._id, formData);
      setErrors({});
      setOpenEdit(false);
    } catch (error) {
      console.error('Error updating message:', error);
      setErrors({ submit: error.response?.data?.message || 'Failed to update message' });
    }
  };

  const handleDeleteMessage = async () => {
    try {
      await deleteMessage(selectedMessage._id);
      setOpenDelete(false);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      <Typography variant="h4" sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', mb: 4, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
        Contact Messages
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: { xs: '15px', md: '20px' }, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#A51C30' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', display: { xs: 'none', md: 'table-cell' } }}>Email</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', display: { xs: 'none', sm: 'table-cell' } }}>Phone</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', display: { xs: 'none', md: 'table-cell' } }}>Date</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontFamily: '"Viga", sans-serif' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message._id} sx={{ '&:hover': { bgcolor: '#FF7E7E10' } }}>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif' }}>{message.name}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', display: { xs: 'none', md: 'table-cell' } }}>{message.email}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', display: { xs: 'none', sm: 'table-cell' } }}>{message.phone}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', display: { xs: 'none', md: 'table-cell' } }}>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => { setSelectedMessage(message); setOpenDetails(true); }} sx={{ color: '#F0A202' }}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => { setSelectedMessage(message); setFormData({ name: message.name, email: message.email, phone: message.phone, message: message.message }); setOpenEdit(true); }} sx={{ color: '#666' }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => { setSelectedMessage(message); setOpenDelete(true); }} sx={{ color: '#A51C30' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Message Details</DialogTitle>
        <DialogContent>
          {selectedMessage && (
            <Box sx={{ py: 2 }}>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Name:</strong> {selectedMessage.name}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Email:</strong> {selectedMessage.email}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Phone:</strong> {selectedMessage.phone}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', mb: 1 }}><strong>Message:</strong></Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', bgcolor: '#F9F9F9', p: 2, borderRadius: '10px' }}>
                {selectedMessage.message}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDetails(false)} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Edit Message</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={!!errors.name} helperText={errors.name} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} error={!!errors.phone} helperText={errors.phone} sx={{ mb: 2 }} />
          <TextField fullWidth multiline rows={4} label="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} error={!!errors.message} helperText={errors.message} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenEdit(false)} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleEditMessage} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif' }}>
            Are you sure you want to delete this message from <strong>{selectedMessage?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDelete(false)} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleDeleteMessage} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MessageManagement;
