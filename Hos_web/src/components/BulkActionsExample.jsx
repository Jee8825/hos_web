// Example component showing how to use bulk operations
import { useState } from 'react';
import { Button, Checkbox, Alert } from '@mui/material';
import { bulkApproveAppointments, bulkCancelAppointments } from '../utils/bulkOperations';
import { detectBookingConflicts } from '../utils/conflictDetection';

const BulkActionsExample = ({ appointments, onUpdate }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return;
    
    setLoading(true);
    try {
      const result = await bulkApproveAppointments(selectedIds);
      setMessage(`Successfully approved ${result.success} appointments`);
      setSelectedIds([]);
      onUpdate?.();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const handleBulkCancel = async () => {
    if (selectedIds.length === 0) return;
    
    setLoading(true);
    try {
      const result = await bulkCancelAppointments(selectedIds);
      setMessage(`Successfully cancelled ${result.success} appointments`);
      setSelectedIds([]);
      onUpdate?.();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const checkConflicts = (newBooking) => {
    const conflicts = detectBookingConflicts(appointments, newBooking);
    if (conflicts.hasConflict) {
      setMessage(`Conflict detected: ${conflicts.message}`);
    }
    return conflicts;
  };

  return (
    <div>
      {message && <Alert severity={message.includes('Error') ? 'error' : 'success'}>{message}</Alert>}
      
      <div style={{ margin: '10px 0' }}>
        <Button 
          onClick={handleBulkApprove} 
          disabled={selectedIds.length === 0 || loading}
          variant="contained"
          color="primary"
        >
          Approve Selected ({selectedIds.length})
        </Button>
        
        <Button 
          onClick={handleBulkCancel} 
          disabled={selectedIds.length === 0 || loading}
          variant="contained"
          color="error"
          style={{ marginLeft: '10px' }}
        >
          Cancel Selected ({selectedIds.length})
        </Button>
      </div>

      {appointments?.map(apt => (
        <div key={apt._id} style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
          <Checkbox 
            checked={selectedIds.includes(apt._id)}
            onChange={() => handleSelect(apt._id)}
          />
          <span>{apt.name} - {apt.date} {apt.time} ({apt.status})</span>
        </div>
      ))}
    </div>
  );
};

export default BulkActionsExample;