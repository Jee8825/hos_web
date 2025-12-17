// Session restoration utility
import { getItem, setItem, STORAGE_KEYS } from './localStorage.js';

const SESSION_KEY = 'app_session';

export const saveSession = (sessionData) => {
  return setItem(SESSION_KEY, {
    ...sessionData,
    timestamp: Date.now()
  }, null); // No expiration
};

export const restoreSession = () => {
  const session = getItem(SESSION_KEY);
  if (!session) return null;
  
  // Check if session is less than 24 hours old
  const isValid = Date.now() - session.timestamp < 24 * 60 * 60 * 1000;
  return isValid ? session : null;
};

export const clearSession = () => {
  localStorage.removeItem('hospital_' + SESSION_KEY);
};