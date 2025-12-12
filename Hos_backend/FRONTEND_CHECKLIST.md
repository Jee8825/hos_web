# Frontend Integration Checklist

Use this checklist to ensure complete integration with the backend.

---

## 📦 Step 1: Install Dependencies

```bash
npm install socket.io-client axios
```

- [ ] socket.io-client installed
- [ ] axios installed

---

## 🔧 Step 2: Create Service Files

### Create `src/services/api.js`
- [ ] API base URL set to `http://localhost:5001/api`
- [ ] Axios instance created
- [ ] Token interceptor added
- [ ] All API functions exported (signup, login, getServices, etc.)

### Create `src/services/socket.js`
- [ ] Socket URL set to `http://localhost:5001`
- [ ] SocketService class created
- [ ] connect() method implemented
- [ ] disconnect() method implemented
- [ ] on() and off() methods implemented

---

## 🗑️ Step 3: Remove localStorage Usage

Search and remove ALL instances of:
- [ ] `localStorage.setItem('users', ...)`
- [ ] `localStorage.getItem('users')`
- [ ] `localStorage.setItem('services', ...)`
- [ ] `localStorage.getItem('services')`
- [ ] `localStorage.setItem('appointments', ...)`
- [ ] `localStorage.getItem('appointments')`
- [ ] `localStorage.setItem('messages', ...)`
- [ ] `localStorage.getItem('messages')`
- [ ] Any other localStorage usage for app data

**Note:** You can keep localStorage for theme, language, or UI preferences.

---

## 🔌 Step 4: Connect Socket in App.jsx

- [ ] Import socketService
- [ ] Call `socketService.connect()` in useEffect on mount
- [ ] Call `socketService.disconnect()` in cleanup
- [ ] Verify connection in browser console

---

## 🔐 Step 5: Update Authentication

### Signup Component
- [ ] Import `signup` from api.js
- [ ] Call API on form submit
- [ ] Store token in sessionStorage
- [ ] Store user in sessionStorage
- [ ] Redirect after successful signup
- [ ] Handle errors (duplicate email, etc.)

### Login Component
- [ ] Import `login` from api.js
- [ ] Call API on form submit
- [ ] Store token in sessionStorage
- [ ] Store user in sessionStorage
- [ ] Redirect based on role (admin/user)
- [ ] Handle errors (invalid credentials, user deleted)

### Logout
- [ ] Clear sessionStorage on logout
- [ ] Redirect to login page

---

## 🏥 Step 6: Update ServicePage.jsx

- [ ] Import `getServices` from api.js
- [ ] Import socketService
- [ ] Fetch services from API on mount
- [ ] Listen to `service:created` event
- [ ] Listen to `service:updated` event
- [ ] Listen to `service:deleted` event
- [ ] Update state on socket events
- [ ] Remove socket listeners in cleanup
- [ ] Use ServiceCard component for display

---

## 📅 Step 7: Update Appointment Form

- [ ] Import `createAppointment` from api.js
- [ ] Import `getServices` for dropdown
- [ ] Call API on form submit
- [ ] Handle success response
- [ ] Handle errors
- [ ] Clear form after success

---

## 📧 Step 8: Update Contact Form

- [ ] Import `createMessage` from api.js
- [ ] Call API on form submit
- [ ] Show success message
- [ ] Handle errors
- [ ] Clear form after success

---

## 👨‍💼 Step 9: Admin - Service Management

- [ ] Import all service API functions
- [ ] Import socketService
- [ ] Fetch services on mount
- [ ] Create service form with modal
- [ ] Edit service functionality
- [ ] Delete service with confirmation
- [ ] Listen to socket events for real-time updates
- [ ] Handle errors (service has appointments, etc.)

---

## 👥 Step 10: Admin - User Management

- [ ] Import all user API functions
- [ ] Import socketService
- [ ] Fetch users on mount
- [ ] Create user form with modal
- [ ] Edit user functionality
- [ ] Delete user with confirmation
- [ ] Listen to socket events for real-time updates
- [ ] Handle errors

---

## 📋 Step 11: Admin - Appointment Management

- [ ] Import all appointment API functions
- [ ] Import socketService
- [ ] Create navigation for status filters (Pending/Postponed/Completed)
- [ ] Fetch appointments by status
- [ ] Create appointment form with modal
- [ ] Edit appointment functionality
- [ ] Delete appointment with confirmation
- [ ] Status change functionality
- [ ] Listen to socket events for real-time updates
- [ ] Handle appointment moving between sections on status change

---

## 💬 Step 12: Admin - Message Management

- [ ] Import `getMessages` from api.js
- [ ] Import socketService
- [ ] Fetch messages on mount
- [ ] Display messages in table/list
- [ ] Listen to `message:created` event
- [ ] Update state on new message

---

## 🔒 Step 13: Protected Routes

- [ ] Create ProtectedRoute component
- [ ] Check token existence
- [ ] Verify user role for admin routes
- [ ] Redirect to login if not authenticated
- [ ] Redirect to home if not admin (for admin routes)

---

## 🎨 Step 14: Maintain Design

- [ ] All animations preserved
- [ ] Scroll-to-top behavior working
- [ ] Color theme consistent
- [ ] Responsive design maintained
- [ ] Modals styled correctly
- [ ] Tables aligned properly
- [ ] ServiceCard component used consistently

---

## 🧪 Step 15: Testing

### Authentication
- [ ] Signup creates user in DB
- [ ] Login returns token and user
- [ ] Token stored correctly
- [ ] Logout clears session
- [ ] Invalid credentials show error
- [ ] Duplicate email shows error

### Services
- [ ] Services load from DB on page load
- [ ] Admin can create service
- [ ] New service appears instantly (socket)
- [ ] Admin can edit service
- [ ] Edit updates instantly (socket)
- [ ] Admin can delete service
- [ ] Delete removes instantly (socket)
- [ ] Cannot delete service with appointments

### Appointments
- [ ] User can create appointment
- [ ] Admin can view all appointments
- [ ] Filter by status works
- [ ] Admin can edit appointment
- [ ] Status change moves appointment to correct section
- [ ] Admin can delete appointment
- [ ] Real-time updates work

### Messages
- [ ] User can send message
- [ ] Admin can view all messages
- [ ] New messages appear instantly

### Real-Time Sync
- [ ] Open two browser tabs
- [ ] Create service in one tab
- [ ] Verify it appears in other tab instantly
- [ ] Test with appointments, users, messages

### Persistence
- [ ] Close browser
- [ ] Reopen and navigate to services
- [ ] Verify services load from DB (not localStorage)
- [ ] Repeat for appointments, users, messages

---

## 🚨 Common Issues & Solutions

### Socket not connecting
- Check socket URL is `http://localhost:5001`
- Verify backend is running
- Check browser console for errors

### API calls failing
- Check API base URL is `http://localhost:5001/api`
- Verify token is in Authorization header
- Check backend logs for errors

### Token invalid
- Login again to get fresh token
- Token expires after 7 days

### CORS errors
- Verify FRONTEND_URL in backend .env matches your frontend URL
- Restart backend after changing .env

### Real-time updates not working
- Verify socket is connected
- Check socket listeners are registered
- Verify backend emits events (check server logs)

---

## ✅ Final Verification

- [ ] No localStorage usage for app data
- [ ] All forms submit to backend
- [ ] All data loads from backend
- [ ] Real-time updates work across tabs
- [ ] Admin CRUD operations work
- [ ] Authentication works
- [ ] Protected routes work
- [ ] Design and animations preserved
- [ ] Responsive on all screen sizes
- [ ] No console errors

---

## 📝 Code Review Checklist

- [ ] No hardcoded data (all from API)
- [ ] Error handling on all API calls
- [ ] Loading states implemented
- [ ] Success/error messages shown to user
- [ ] Forms validate input
- [ ] Socket listeners cleaned up in useEffect
- [ ] Token included in protected requests
- [ ] Code is clean and readable

---

## 🎉 Completion

Once all items are checked:
1. Test thoroughly in development
2. Update API URLs for production
3. Deploy frontend
4. Verify production works
5. Celebrate! 🎊

---

**Need help?** Check:
- README.md - Complete API documentation
- FRONTEND_INTEGRATION.md - Code examples
- QUICKSTART.md - Setup guide
- POSTMAN_COLLECTION.json - API testing
