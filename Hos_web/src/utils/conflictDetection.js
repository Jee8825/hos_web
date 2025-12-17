// Client-side conflict detection
export const detectBookingConflicts = (appointments, newBooking) => {
  const conflicts = appointments.filter(apt => {
    if (apt.doctorId !== newBooking.doctorId) return false;
    if (apt.status === 'cancelled') return false;
    
    const aptDate = new Date(apt.appointmentDate).toDateString();
    const newDate = new Date(newBooking.appointmentDate).toDateString();
    
    return aptDate === newDate && apt.appointmentTime === newBooking.appointmentTime;
  });
  
  return {
    hasConflict: conflicts.length > 0,
    conflicts,
    message: conflicts.length > 0 ? 'Time slot already booked' : null
  };
};

export const validateAppointmentLimit = (userAppointments, userId, limit = 6) => {
  const activeAppointments = userAppointments.filter(apt => 
    apt.userId === userId && 
    ['pending', 'confirmed'].includes(apt.status?.toLowerCase())
  );
  
  return {
    isValid: activeAppointments.length < limit,
    current: activeAppointments.length,
    limit,
    message: activeAppointments.length >= limit ? `Maximum ${limit} appointments allowed` : null
  };
};