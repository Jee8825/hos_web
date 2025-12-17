import { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tooltip, Alert, MenuItem, InputAdornment, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import socketService from '../services/socket';
import { ValidationRequirements, FieldHelper, passwordRequirements, phoneRequirements, fieldHelpers } from '../components/ValidationHelper';
import { getFormDraft, clearFormDraft } from '../utils/localStorage';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'user' });
  const [errors, setErrors] = useState({});
  const [showDraftNotice, setShowDraftNotice] = useState(false);

  useEffect(() => {
    loadUsers();
    
    // Check for unsaved draft
    const draft = getFormDraft('user_add');
    if (draft && Object.values(draft).some(v => v)) {
      setShowDraftNotice(true);
    }
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  useEffect(() => {
    const handleUserCreated = (user) => setUsers(prev => [...prev, user]);
    const handleUserUpdated = (user) => setUsers(prev => prev.map(u => u._id === user._id ? user : u));
    const handleUserDeleted = ({ id }) => setUsers(prev => prev.filter(u => u._id !== id));

    socketService.on('user:created', handleUserCreated);
    socketService.on('user:updated', handleUserUpdated);
    socketService.on('user:deleted', handleUserDeleted);

    return () => {
      socketService.off('user:created', handleUserCreated);
      socketService.off('user:updated', handleUserUpdated);
      socketService.off('user:deleted', handleUserDeleted);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Phone validation (10 digits starting with 6-9)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        newErrors.phone = 'Phone number must be 10 digits starting with 6, 7, 8, or 9';
      }
    }
    
    // Password validation (only for add, optional for edit)
    if (!openEdit && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      } else if (!/\d/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;
    
    const emailExists = users.some(u => u.email.toLowerCase() === formData.email.toLowerCase());
    if (emailExists) {
      setErrors({ submit: 'Email already exists.' });
      return;
    }
    
    const phoneExists = users.some(u => u.phone === formData.phone);
    if (phoneExists) {
      setErrors({ submit: 'Phone number already exists.' });
      return;
    }
    
    try {
      await createUser(formData);
      setFormData({ name: '', email: '', password: '', phone: '', role: 'user' });
      clearFormDraft('user_add');
      setErrors({});
      setOpenAdd(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to add user' });
    }
  };

  const handleEditUser = async () => {
    if (!validateForm()) return;
    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;
      await updateUser(selectedUser._id, updateData);
      setErrors({});
      setOpenEdit(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to update user' });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser._id);
      setOpenDelete(false);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to delete user' });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 3, md: 4 }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Typography variant="h4" sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
          User Management
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
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: { xs: '15px', md: '20px' }, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#A51C30' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', display: { xs: 'none', md: 'table-cell' } }}>Email</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif', display: { xs: 'none', sm: 'table-cell' } }}>Phone</TableCell>
              <TableCell sx={{ color: '#fff', fontFamily: '"Viga", sans-serif' }}>Role</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontFamily: '"Viga", sans-serif' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} sx={{ '&:hover': { bgcolor: '#FF7E7E10' } }}>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif' }}>{user.name}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', display: { xs: 'none', md: 'table-cell' } }}>{user.email}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif', display: { xs: 'none', sm: 'table-cell' } }}>{user.phone}</TableCell>
                <TableCell sx={{ fontFamily: '"Noto Serif Georgian", serif' }}>{user.role}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Show Details">
                    <IconButton onClick={() => { setSelectedUser(user); setOpenDetails(true); }} sx={{ color: '#F0A202' }}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => { setSelectedUser(user); setFormData({ ...user, password: '' }); setOpenEdit(true); }} sx={{ color: '#666' }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => { setSelectedUser(user); setOpenDelete(true); }} sx={{ color: '#A51C30' }}>
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
      <Snackbar
        open={showDraftNotice}
        autoHideDuration={6000}
        onClose={() => setShowDraftNotice(false)}
        message="You have an unsaved draft from your last session"
        action={
          <Button color="secondary" size="small" onClick={() => {
            const draft = getFormDraft('user_add');
            if (draft) setFormData(draft);
            setShowDraftNotice(false);
            setOpenAdd(true);
          }}>
            RESTORE
          </Button>
        }
      />

      <Dialog open={openAdd} onClose={() => { setOpenAdd(false); setErrors({}); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Add New User</DialogTitle>
        <DialogContent>
          {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}
          <TextField fullWidth label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={!!errors.name} helperText={errors.name} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }} />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            error={!!errors.password} 
            helperText={errors.password} 
            InputProps={{
              endAdornment: <InputAdornment position="end"><FieldHelper {...fieldHelpers.password} /></InputAdornment>
            }}
            sx={{ mb: 2 }} 
          />
          {formData.password && <ValidationRequirements requirements={passwordRequirements} values={formData.password} />}
          <TextField 
            fullWidth 
            label="Phone" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            error={!!errors.phone} 
            helperText={errors.phone || 'Must start with 6, 7, 8, or 9'} 
            placeholder="9876543210"
            InputProps={{
              endAdornment: <InputAdornment position="end"><FieldHelper {...fieldHelpers.phone} /></InputAdornment>
            }}
            sx={{ mb: 2 }} 
          />
          {formData.phone && <ValidationRequirements requirements={phoneRequirements} values={formData.phone} />}
          <TextField fullWidth select label="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} sx={{ mb: 2 }}>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => { setOpenAdd(false); setErrors({}); }} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleAddUser} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => { setOpenEdit(false); setErrors({}); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Edit User</DialogTitle>
        <DialogContent>
          {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}
          <TextField fullWidth label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={!!errors.name} helperText={errors.name} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={!!errors.email} helperText={errors.email} sx={{ mb: 2 }} />
          <TextField 
            fullWidth 
            label="Password (leave blank to keep current)" 
            type="password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: <InputAdornment position="end"><FieldHelper {...fieldHelpers.password} /></InputAdornment>
            }}
            sx={{ mb: 2 }} 
          />
          {formData.password && <ValidationRequirements requirements={passwordRequirements} values={formData.password} />}
          <TextField 
            fullWidth 
            label="Phone" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            error={!!errors.phone} 
            helperText={errors.phone || 'Must start with 6, 7, 8, or 9'} 
            placeholder="9876543210"
            InputProps={{
              endAdornment: <InputAdornment position="end"><FieldHelper {...fieldHelpers.phone} /></InputAdornment>
            }}
            sx={{ mb: 2 }} 
          />
          {formData.phone && <ValidationRequirements requirements={phoneRequirements} values={formData.phone} />}
          <TextField fullWidth select label="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} sx={{ mb: 2 }}>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => { setOpenEdit(false); setErrors({}); }} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleEditUser} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>User Details</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ mb: 2, p: 2, bgcolor: '#F9F9F9', borderRadius: '10px' }}>
              <Typography sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: '0.9rem', mb: 0.5 }}>Name</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', color: '#333' }}>{selectedUser?.name}</Typography>
            </Box>
            <Box sx={{ mb: 2, p: 2, bgcolor: '#F9F9F9', borderRadius: '10px' }}>
              <Typography sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: '0.9rem', mb: 0.5 }}>Email</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', color: '#333' }}>{selectedUser?.email}</Typography>
            </Box>
            <Box sx={{ mb: 2, p: 2, bgcolor: '#F9F9F9', borderRadius: '10px' }}>
              <Typography sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: '0.9rem', mb: 0.5 }}>Phone</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', color: '#333' }}>{selectedUser?.phone}</Typography>
            </Box>
            <Box sx={{ mb: 2, p: 2, bgcolor: '#F9F9F9', borderRadius: '10px' }}>
              <Typography sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: '0.9rem', mb: 0.5 }}>Role</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', color: '#333', textTransform: 'capitalize' }}>{selectedUser?.role}</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: '#F9F9F9', borderRadius: '10px' }}>
              <Typography sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30', fontSize: '0.9rem', mb: 0.5 }}>Created At</Typography>
              <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif', color: '#333' }}>{selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDetails(false)} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ fontFamily: '"Viga", sans-serif', color: '#A51C30' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: '"Noto Serif Georgian", serif' }}>
            Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDelete(false)} sx={{ color: '#666' }}>Cancel</Button>
          <Button onClick={handleDeleteUser} sx={{ bgcolor: '#A51C30', color: '#fff', '&:hover': { bgcolor: '#8B1628' } }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
