// Lightweight cleanup jobs for free tier
const cron = require('node-cron');
const Appointment = require('../model/Appointment');

// Run once daily at 3 AM (when server likely sleeping)
const cleanupExpiredAppointments = cron.schedule('0 3 * * *', async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const result = await Appointment.deleteMany({
      status: { $in: ['completed', 'cancelled'] },
      updatedAt: { $lt: thirtyDaysAgo }
    });
    
    console.log(`Cleaned up ${result.deletedCount} old appointments`);
  } catch (error) {
    console.error('Cleanup job failed:', error);
  }
}, {
  scheduled: false // Don't start automatically
});

// Simple health check endpoint
const healthCheck = async (req, res) => {
  try {
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
};

module.exports = {
  cleanupExpiredAppointments,
  healthCheck
};