const cron = require('node-cron');
const Appointment = require('../model/Appointment');

const cleanupOldAppointments = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const completedResult = await Appointment.deleteMany({
      status: 'completed',
      completedAt: { $lt: thirtyDaysAgo }
    });

    const cancelledResult = await Appointment.deleteMany({
      status: 'cancelled',
      cancelledAt: { $lt: thirtyDaysAgo }
    });

    console.log(`[${new Date().toISOString()}] Cleanup job: Deleted ${completedResult.deletedCount} completed and ${cancelledResult.deletedCount} cancelled appointments older than 30 days.`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Cleanup job error:`, error.message);
  }
};

const startCleanupJobs = () => {
  // Run daily at 2 AM
  cron.schedule('0 2 * * *', cleanupOldAppointments);
  console.log('Cleanup job scheduled: Daily at 2:00 AM');
};

module.exports = { startCleanupJobs, cleanupOldAppointments };
