require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./router/authRoutes');
const userRoutes = require('./router/userRoutes');
const serviceRoutes = require('./router/serviceRoutes');
const appointmentRoutes = require('./router/appointmentRoutes');
const messageRoutes = require('./router/messageRoutes');
const { startCleanupJobs } = require('./jobs/cleanupJobs');
const { cleanupExpiredAppointments, healthCheck } = require('./jobs/lightweightCleanup');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Middleware
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Attach io to req for controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    startCleanupJobs();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', healthCheck);

// Start lightweight cleanup job
if (process.env.NODE_ENV === 'production') {
  cleanupExpiredAppointments.start();
}

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📅 Deployed: ${new Date().toISOString()}`);
});
