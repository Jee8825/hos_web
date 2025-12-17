// Script to check current appointment data
require('dotenv').config();
const mongoose = require('mongoose');
const Appointment = require('./model/Appointment');
const Service = require('./model/Service'); // Register Service model

async function checkAppointments() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all appointments
    const allAppointments = await Appointment.find()
      .populate('serviceRef', 'title')
      .sort({ createdAt: -1 });

    console.log(`📊 Total Appointments: ${allAppointments.length}\n`);

    // Group by status
    const byStatus = {};
    allAppointments.forEach(apt => {
      const status = apt.status || 'undefined';
      if (!byStatus[status]) byStatus[status] = [];
      byStatus[status].push(apt);
    });

    // Display by status
    Object.keys(byStatus).sort().forEach(status => {
      console.log(`\n📋 ${status.toUpperCase()} (${byStatus[status].length}):`);
      byStatus[status].slice(0, 5).forEach(apt => {
        console.log(`   - ${apt.name} | ${apt.date} ${apt.time} | Service: ${apt.serviceRef?.title || 'N/A'}`);
      });
      if (byStatus[status].length > 5) {
        console.log(`   ... and ${byStatus[status].length - 5} more`);
      }
    });

    // Check for invalid status values
    const validStatuses = ['pending', 'postponed', 'completed', 'cancelled'];
    const invalidAppointments = allAppointments.filter(apt => !validStatuses.includes(apt.status));
    
    if (invalidAppointments.length > 0) {
      console.log(`\n⚠️  WARNING: Found ${invalidAppointments.length} appointments with invalid status:`);
      invalidAppointments.forEach(apt => {
        console.log(`   - ID: ${apt._id} | Status: "${apt.status}" | Name: ${apt.name}`);
      });
      console.log('\n💡 Run: node fixAppointmentStatus.js to fix these issues');
    } else {
      console.log('\n✅ All appointments have valid status values!');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAppointments();