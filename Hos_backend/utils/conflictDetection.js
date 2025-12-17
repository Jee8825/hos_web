// Backend conflict detection utilities
const detectBookingConflicts = (appointments, newBooking) => {
  const conflicts = appointments.filter(apt => {
    if (apt.doctorId !== newBooking.doctorId) return false;
    if (apt.status === 'cancelled') return false;
    
    const aptDate = new Date(apt.date).toDateString();
    const newDate = new Date(newBooking.appointmentDate).toDateString();
    
    return aptDate === newDate && apt.time === newBooking.appointmentTime;
  });
  
  return {
    hasConflict: conflicts.length > 0,
    conflicts,
    message: conflicts.length > 0 ? 'Time slot already booked' : null
  };
};

const validateAppointmentLimit = (userAppointments, userEmail, limit = 6) => {
  const activeAppointments = userAppointments.filter(apt => 
    apt.email.toLowerCase() === userEmail.toLowerCase() && 
    ['pending', 'postponed'].includes(apt.status?.toLowerCase())
  );
  
  return {
    isValid: activeAppointments.length < limit,
    current: activeAppointments.length,
    limit,
    message: activeAppointments.length >= limit ? `Maximum ${limit} appointments allowed per user` : null
  };
};

module.exports = {
  detectBookingConflicts,
  validateAppointmentLimit
};