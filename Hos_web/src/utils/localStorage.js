// Professional localStorage utility with error handling and expiration

const STORAGE_PREFIX = 'hospital_';
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

// Storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  FORM_DRAFTS: 'form_drafts',
  RECENT_SEARCHES: 'recent_searches',
  THEME_MODE: 'theme_mode',
  TABLE_FILTERS: 'table_filters',
  LAST_VISITED: 'last_visited',
  DISMISSED_ALERTS: 'dismissed_alerts',
  USER_INFO: 'user_info'
};

// Set item with expiration
export const setItem = (key, value, expirationMs = EXPIRATION_TIME) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
      expiration: expirationMs
    };
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Get item with expiration check
export const getItem = (key) => {
  try {
    const itemStr = localStorage.getItem(STORAGE_PREFIX + key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = Date.now();

    // Check if expired
    if (item.expiration && now - item.timestamp > item.expiration) {
      removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Remove item
export const removeItem = (key) => {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Clear all app data
export const clearAll = () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Save form draft
export const saveFormDraft = (formName, data) => {
  const drafts = getItem(STORAGE_KEYS.FORM_DRAFTS) || {};
  drafts[formName] = {
    data,
    savedAt: Date.now()
  };
  return setItem(STORAGE_KEYS.FORM_DRAFTS, drafts, 7 * 24 * 60 * 60 * 1000); // 7 days
};

// Get form draft
export const getFormDraft = (formName) => {
  const drafts = getItem(STORAGE_KEYS.FORM_DRAFTS) || {};
  return drafts[formName]?.data || null;
};

// Clear form draft
export const clearFormDraft = (formName) => {
  const drafts = getItem(STORAGE_KEYS.FORM_DRAFTS) || {};
  delete drafts[formName];
  return setItem(STORAGE_KEYS.FORM_DRAFTS, drafts);
};

// Save user preferences
export const saveUserPreferences = (preferences) => {
  return setItem(STORAGE_KEYS.USER_PREFERENCES, preferences, null); // No expiration
};

// Get user preferences
export const getUserPreferences = () => {
  return getItem(STORAGE_KEYS.USER_PREFERENCES) || {
    tableRowsPerPage: 10,
    defaultView: 'grid',
    notifications: true
  };
};

// Save table filters
export const saveTableFilters = (tableName, filters) => {
  const allFilters = getItem(STORAGE_KEYS.TABLE_FILTERS) || {};
  allFilters[tableName] = filters;
  return setItem(STORAGE_KEYS.TABLE_FILTERS, allFilters);
};

// Get table filters
export const getTableFilters = (tableName) => {
  const allFilters = getItem(STORAGE_KEYS.TABLE_FILTERS) || {};
  return allFilters[tableName] || null;
};

// Track last visited page
export const saveLastVisited = (path) => {
  return setItem(STORAGE_KEYS.LAST_VISITED, { path, timestamp: Date.now() });
};

// Get last visited page
export const getLastVisited = () => {
  return getItem(STORAGE_KEYS.LAST_VISITED);
};

// Dismiss alert
export const dismissAlert = (alertId) => {
  const dismissed = getItem(STORAGE_KEYS.DISMISSED_ALERTS) || [];
  if (!dismissed.includes(alertId)) {
    dismissed.push(alertId);
    setItem(STORAGE_KEYS.DISMISSED_ALERTS, dismissed, 30 * 24 * 60 * 60 * 1000); // 30 days
  }
};

// Check if alert is dismissed
export const isAlertDismissed = (alertId) => {
  const dismissed = getItem(STORAGE_KEYS.DISMISSED_ALERTS) || [];
  return dismissed.includes(alertId);
};

// Add to recent searches
export const addRecentSearch = (searchTerm) => {
  const recent = getItem(STORAGE_KEYS.RECENT_SEARCHES) || [];
  const filtered = recent.filter(term => term !== searchTerm);
  filtered.unshift(searchTerm);
  const limited = filtered.slice(0, 10); // Keep only last 10
  return setItem(STORAGE_KEYS.RECENT_SEARCHES, limited);
};

// Get recent searches
export const getRecentSearches = () => {
  return getItem(STORAGE_KEYS.RECENT_SEARCHES) || [];
};

// Clear recent searches
export const clearRecentSearches = () => {
  return removeItem(STORAGE_KEYS.RECENT_SEARCHES);
};

// Save user common info (name, email, phone)
export const saveUserInfo = (userInfo) => {
  return setItem(STORAGE_KEYS.USER_INFO, userInfo, null); // No expiration
};

// Get user common info
export const getUserInfo = () => {
  return getItem(STORAGE_KEYS.USER_INFO) || null;
};

// Update user info (merge with existing)
export const updateUserInfo = (updates) => {
  const current = getUserInfo() || {};
  const updated = { ...current, ...updates };
  return saveUserInfo(updated);
};
