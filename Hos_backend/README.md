# Hospital Management System - Backend

Complete MERN backend with MongoDB Atlas, real-time sync via Socket.io, JWT authentication, and automated cleanup jobs.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
The `.env` file is already configured with MongoDB Atlas connection. Verify these variables:
```
MONGO_URI=mongodb+srv://jeeva_db:jeeva%40007@cluster0.7jwugwh.mongodb.net/hospital_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

---

## API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890"
  }
  ```
  Response: `{ token, user }`

- **POST** `/api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Response: `{ token, user }` (increments logsCount)

### Services
- **GET** `/api/services` - Get all services (public)
- **POST** `/api/services` - Create service (admin only)
  ```json
  {
    "title": "Cardiology",
    "description": "Heart care services",
    "keyServices": ["ECG", "Angiography"],
    "iconName": "FavoriteOutlined"
  }
  ```
- **PUT** `/api/services/:id` - Update service (admin only)
- **DELETE** `/api/services/:id` - Delete service (admin only, blocks if appointments exist)

### Users
- **GET** `/api/users` - Get all users (admin only)
- **POST** `/api/users` - Create user (admin only)
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123",
    "phone": "9876543210",
    "role": "user"
  }
  ```
- **PUT** `/api/users/:id` - Update user (admin only)
- **DELETE** `/api/users/:id` - Delete user (admin only)

### Appointments
- **GET** `/api/appointments?status=pending` - Get appointments (admin only, filter by status)
- **POST** `/api/appointments` - Create appointment (public)
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "serviceRef": "SERVICE_ID",
    "date": "2024-01-15",
    "time": "10:00",
    "status": "pending",
    "details": "Checkup"
  }
  ```
- **PUT** `/api/appointments/:id` - Update appointment (admin only)
- **DELETE** `/api/appointments/:id` - Delete appointment (admin only)

### Messages
- **GET** `/api/messages` - Get all contact messages (admin only)
- **POST** `/api/messages` - Submit contact form (public)
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "I need help with..."
  }
  ```

### Health Check
- **GET** `/api/health` - Server health status

---

## Authentication

Protected routes require JWT token in Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Admin-only routes also check `role === 'admin'`.

---

## Real-Time Events (Socket.io)

### Event Names
- `service:created` - New service added
- `service:updated` - Service modified
- `service:deleted` - Service removed
- `user:created` - New user added
- `user:updated` - User modified
- `user:deleted` - User removed
- `appointment:created` - New appointment
- `appointment:updated` - Appointment modified
- `appointment:deleted` - Appointment removed
- `appointment:statusChanged` - Status changed
- `message:created` - New contact message

### Frontend Integration Example
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Listen for service updates
socket.on('service:created', (service) => {
  // Add service to state
  setServices(prev => [...prev, service]);
});

socket.on('service:updated', (service) => {
  // Update service in state
  setServices(prev => prev.map(s => s._id === service._id ? service : s));
});

socket.on('service:deleted', ({ id }) => {
  // Remove service from state
  setServices(prev => prev.filter(s => s._id !== id));
});

// Similar patterns for users, appointments, messages
```

---

## Automated Cleanup

**Completed Appointments Auto-Delete:**
- Appointments with `status: 'completed'` are automatically deleted 30 days after `completedAt` date
- Uses MongoDB TTL index (automatic) + daily cron job at 2:00 AM (backup)
- Logs cleanup activity to console

---

## Sample API Calls (curl)

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"pass123","phone":"1234567890"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Create Service (Admin)
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Cardiology","description":"Heart care","keyServices":["ECG"],"iconName":"FavoriteOutlined"}'
```

### Create Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"123","serviceRef":"SERVICE_ID","date":"2024-01-15","time":"10:00"}'
```

### Get Services
```bash
curl http://localhost:5000/api/services
```

---

## Database Models

### User
- `name`, `email` (unique), `passwordHash`, `phone`, `role` (admin/user)
- `logsCount`, `lastLogin`, `createdAt`

### Service
- `title`, `description`, `keyServices[]`, `iconName`
- `createdAt`, `updatedAt`

### Appointment
- `userRef` (nullable), `name`, `email`, `phone`, `serviceRef`
- `date`, `time`, `status` (pending/postponed/completed)
- `details`, `scheduledAt`, `completedAt`, `createdAt`, `updatedAt`
- TTL index on `completedAt` (30 days)

### Message
- `userRef` (nullable), `name`, `email`, `phone`, `message`
- `createdAt`

---

## Edge Cases Handled

1. **Service Deletion:** Blocked if appointments reference the service
2. **User Deletion:** Allowed; frontend should check user existence on login
3. **Duplicate Email:** Returns 400 error
4. **Invalid Credentials:** Returns 401 error
5. **Missing Fields:** Returns 400 with validation message
6. **Unauthorized Access:** Returns 401/403 with appropriate message

---

## Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT authentication (7-day expiry)
- ✅ Role-based access control (admin/user)
- ✅ CORS configured for frontend origin
- ✅ Input validation on all endpoints
- ✅ Protected admin routes

---

## Frontend Integration Checklist

1. **Remove all localStorage usage** for users, services, appointments, messages
2. **Install socket.io-client:** `npm install socket.io-client`
3. **Connect to backend:** `const socket = io('http://localhost:5000')`
4. **Subscribe to events** and update state in real-time
5. **Call API endpoints** for all CRUD operations
6. **Store JWT token** in memory or secure storage (not localStorage for sensitive data)
7. **Include token** in Authorization header for protected routes
8. **Handle errors** from API responses (401, 403, 400, etc.)
9. **Fetch data on mount** from API instead of localStorage
10. **Update UI immediately** on socket events

---

## Testing

1. Start backend: `npm run dev`
2. Test health: `curl http://localhost:5000/api/health`
3. Create admin user via signup, then manually update role in MongoDB
4. Test all endpoints with Postman or curl
5. Connect frontend and verify real-time updates

---

## Production Deployment

1. Change `JWT_SECRET` to a strong random string
2. Update `FRONTEND_URL` to production domain
3. Set `NODE_ENV=production`
4. Use process manager (PM2) or container (Docker)
5. Enable MongoDB Atlas IP whitelist for production server
6. Consider rate limiting for auth endpoints (express-rate-limit)

---

## Troubleshooting

- **MongoDB connection fails:** Check `.env` MONGO_URI and network access in Atlas
- **CORS errors:** Verify FRONTEND_URL matches your frontend origin
- **Token invalid:** Check JWT_SECRET consistency and token expiry
- **Socket not connecting:** Ensure frontend uses correct backend URL
- **Appointments not deleting:** TTL index takes effect after creation; cron runs daily

---

## License

MIT
