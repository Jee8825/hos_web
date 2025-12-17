// Auto role assignment based on email domains
const ADMIN_DOMAINS = ['hospital.com', 'admin.hospital.com'];
const DOCTOR_DOMAINS = ['doctor.hospital.com', 'med.hospital.com'];

export const assignRoleByEmail = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  
  if (ADMIN_DOMAINS.includes(domain)) {
    return 'admin';
  }
  
  if (DOCTOR_DOMAINS.includes(domain)) {
    return 'doctor';
  }
  
  return 'patient'; // default role
};

export const validateEmailDomain = (email, allowedDomains = []) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return allowedDomains.length === 0 || allowedDomains.includes(domain);
};