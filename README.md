# 🏥 Hospital Management System - MERN Stack

A full-stack Hospital Management System built with MongoDB, Express.js, React (Vite), and Node.js with real-time updates using Socket.io.

## 🌐 Live Application

- **Frontend**: https://jeeh.netlify.app
- **Backend API**: https://hospital-backend-g8un.onrender.com
- **GitHub**: https://github.com/Jee8825/hos_web.git

## ✨ Features

### Patient Features
- 🏠 Home page with hospital information
- 💼 Browse medical services
- 📅 Book appointments with doctors
- 📞 Contact form for inquiries
- 🔐 User authentication (JWT)

### Admin Features
- 📊 Real-time dashboard with statistics
- 👥 User management (CRUD)
- 🏥 Service management (CRUD)
- 📋 Appointment management (CRUD)
  - Status tracking: Pending, Postponed, Completed, Cancelled
  - Automatic deletion after 30 days
- 💬 Message management (CRUD)
- ⚡ Real-time updates across all pages

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Material-UI (MUI)
- Axios for API calls
- Socket.io-client for real-time updates
- React Router for navigation
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- Socket.io for real-time communication
- JWT for authentication
- Bcrypt for password hashing
- Node-cron for scheduled jobs

### Deployment
- Frontend: Netlify
- Backend: Render.com
- Database: MongoDB Atlas

## 📁 Project Structure

```
react_vite/
├── Hos_web/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API & Socket services
│   │   ├── context/            # React Context
│   │   └── App.jsx             # Main app component
│   ├── .env.production         # Production environment variables
│   └── package.json
│
├── Hos_backend/                # Backend (Node.js + Express)
│   ├── controller/             # Route controllers
│   ├── model/                  # MongoDB models
│   ├── router/                 # API routes
│   ├── middleware/             # Auth middleware
│   ├── jobs/                   # Cron jobs
│   ├── server.js               # Main server file
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md         # Deployment instructions
├── BEST_PRACTICES.md           # Best practices & tips
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Jee8825/hos_web.git
cd react_vite
```

2. **Setup Backend**
```bash
cd Hos_backend
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF

# Start backend
npm start
```

3. **Setup Frontend**
```bash
cd ../Hos_web
npm install

# Create .env.development file
echo "VITE_API_URL=http://localhost:5001/api" > .env.development

# Start frontend
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001/api

### Test Credentials
- **Admin**: admin@hospital.com / admin123
- **User**: john@example.com / user123

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** - Best practices and error prevention

## 🔑 Key Features Explained

### Real-time Updates
- Socket.io broadcasts changes to all connected clients
- Automatic UI updates without page refresh
- Events: service-updated, user-updated, appointment-updated, message-updated

### Automatic Cleanup
- Completed appointments deleted after 30 days
- Cancelled appointments deleted after 30 days
- Two mechanisms: TTL indexes + daily cron job (2 AM)

### Security
- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Environment variable protection

### Validation
- Duplicate prevention (emails, phone numbers, service titles)
- Appointment limit (max 6 per user)
- Form validation on frontend and backend

## 🎨 Design

- **Primary Color**: #A51C30 (Red)
- **Secondary Color**: #F0A202 (Orange)
- **Accent Color**: #FF7E7E (Light Red)
- **Fonts**: Viga, Noto Serif Georgian

## 📊 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

### Services
- GET `/api/services` - Get all services
- POST `/api/services` - Create service
- PUT `/api/services/:id` - Update service
- DELETE `/api/services/:id` - Delete service

### Appointments
- GET `/api/appointments` - Get all appointments
- POST `/api/appointments` - Create appointment
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Delete appointment

### Messages
- GET `/api/messages` - Get all messages
- POST `/api/messages` - Create message
- PUT `/api/messages/:id` - Update message
- DELETE `/api/messages/:id` - Delete message

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check port 5001 is not in use

### Frontend can't connect to backend
- Verify backend is running
- Check VITE_API_URL in .env file
- Check CORS settings on backend

### Real-time updates not working
- Check Socket.io connection in browser console
- Verify FRONTEND_URL on backend matches frontend URL
- Check Socket.io CORS settings

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is for educational purposes.

## 👨‍💻 Developer

**Jee**
- GitHub: [@Jee8825](https://github.com/Jee8825)
- Project: Hospital Management System
- Year: 2024

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render.com for backend hosting
- Netlify for frontend hosting
- Material-UI for component library

---

**Note**: This is a college internship project demonstrating full-stack MERN development with real-time features.

For deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

For best practices, see [BEST_PRACTICES.md](./BEST_PRACTICES.md)
