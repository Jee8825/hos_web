// Bulk operations utility
import { bulkUpdateAppointments as apiBulkUpdate } from '../services/api';

export const bulkUpdateAppointments = async (appointmentIds, updateData) => {
  try {
    const response = await apiBulkUpdate(appointmentIds, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Bulk update failed');
  }
};

export const bulkApproveAppointments = (appointmentIds) => {
  return bulkUpdateAppointments(appointmentIds, { status: 'completed' });
};

export const bulkCancelAppointments = (appointmentIds) => {
  return bulkUpdateAppointments(appointmentIds, { status: 'cancelled' });
};

export const bulkPostponeAppointments = (appointmentIds) => {
  return bulkUpdateAppointments(appointmentIds, { status: 'postponed' });
};