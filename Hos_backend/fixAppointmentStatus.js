// Migration script to fix appointment status values
require('dotenv').config();
const mongoose = require('mongoose');
const Appointment = require('./model/Appointment');
const Service = require('./model/Service'); // Register Service model

async function fixAppointmentStatus() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find all appointments with 'confirmed' status
    const confirmedAppointments = await Appointment.find({ status: 'confirmed' });
    console.log(`Found ${confirmedAppointments.length} appointments with 'confirmed' status`);

    // Update them to 'completed'
    const result = await Appointment.updateMany(
      { status: 'confirmed' },
      { 
        $set: { 
          status: 'completed',
          completedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} appointments from 'confirmed' to 'completed'`);

    // Show current status distribution
    const statusCounts = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📊 Current appointment status distribution:');
    statusCounts.forEach(({ _id, count }) => {
      console.log(`   ${_id}: ${count}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

fixAppointmentStatus();