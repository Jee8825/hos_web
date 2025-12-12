# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Seed Sample Data
```bash
npm run seed
```

This creates:
- ✅ Admin user: `admin@hospital.com` / `admin123`
- ✅ Sample user: `john@example.com` / `user123`
- ✅ 4 sample services (Cardiology, Neurology, Orthopedics, Pediatrics)

### Step 3: Start Server
```bash
npm run dev
```

Server runs on: `http://localhost:5001`

---

## 🧪 Test the API

### 1. Health Check
```bash
curl http://localhost:5001/api/health
```

### 2. Login as Admin
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hospital.com","password":"admin123"}'
```

Copy the `token` from response.

### 3. Get All Services
```bash
curl http://localhost:5001/api/services
```

### 4. Create Appointment
```bash
curl -X POST http://localhost:5001/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Patient",
    "email": "patient@example.com",
    "phone": "1234567890",
    "serviceRef": "SERVICE_ID_FROM_STEP_3",
    "date": "2024-01-20",
    "time": "10:00",
    "details": "Regular checkup"
  }'
```

### 5. Get Appointments (Admin)
```bash
curl http://localhost:5001/api/appointments?status=pending \
  -H "Authorization: Bearer YOUR_TOKEN_FROM_STEP_2"
```

---

## 📡 Test Real-Time Updates

1. Open browser console
2. Paste this code:
```javascript
const socket = io('http://localhost:5001');

socket.on('connect', () => console.log('✅ Connected'));

socket.on('service:created', (data) => console.log('New service:', data));
socket.on('appointment:created', (data) => console.log('New appointment:', data));
```

3. Create a service via API (Step 4 above)
4. Watch console for real-time event!

---

## 📦 Import Postman Collection

1. Open Postman
2. Click Import
3. Select `POSTMAN_COLLECTION.json`
4. All endpoints ready to test!

---

## 🔧 Troubleshooting

**MongoDB connection fails:**
- Check `.env` file has correct `MONGO_URI`
- Verify MongoDB Atlas network access allows your IP

**Port 5001 already in use:**
- Change `PORT=5002` in `.env`
- Restart server

**Token invalid:**
- Login again to get fresh token
- Token expires after 7 days

---

## 📚 Next Steps

1. Read `README.md` for complete API documentation
2. Read `FRONTEND_INTEGRATION.md` for React integration
3. Connect your frontend to the backend
4. Remove all localStorage usage from frontend
5. Test real-time sync across multiple browser tabs

---

## 🎯 Key Features Implemented

✅ MongoDB Atlas connection  
✅ JWT authentication with bcrypt  
✅ Role-based access control (admin/user)  
✅ Real-time sync via Socket.io  
✅ CRUD for Services, Users, Appointments, Messages  
✅ Appointment status management (pending/postponed/completed)  
✅ Auto-delete completed appointments after 30 days  
✅ Service deletion protection (blocks if appointments exist)  
✅ User login tracking (logsCount, lastLogin)  
✅ Comprehensive error handling  
✅ Input validation  

---

## 🌐 Frontend Integration Summary

**Install:**
```bash
npm install socket.io-client axios
```

**Connect:**
```javascript
import io from 'socket.io-client';
const socket = io('http://localhost:5001');
```

**API Calls:**
```javascript
import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:5001/api' });
```

**Remove localStorage:**
- Delete all `localStorage.setItem/getItem` calls
- Fetch data from API on component mount
- Update state via socket events

See `FRONTEND_INTEGRATION.md` for complete code examples!

---

Happy coding! 🎉
