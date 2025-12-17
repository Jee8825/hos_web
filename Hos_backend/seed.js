require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/User');
const Service = require('./model/Service');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin users
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@hospital.com',
      passwordHash: adminPassword,
      phone: '1234567890',
      role: 'admin'
    });
    console.log('✅ Admin user created:', admin.email);

    const suryaPassword = await bcrypt.hash('Surya@123', 10);
    const surya = await User.create({
      name: 'Surya Sekar',
      email: 'suryasekar626@gmail.com',
      passwordHash: suryaPassword,
      phone: '9876543211',
      role: 'admin'
    });
    console.log('✅ Admin user created:', surya.email);

    // Create sample user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash: userPassword,
      phone: '9876543210',
      role: 'user'
    });
    console.log('✅ Sample user created:', user.email);

    // Create sample services
    const services = await Service.insertMany([
      {
        title: 'Cardiology',
        description: 'Comprehensive heart care services with state-of-the-art facilities',
        keyServices: ['ECG', 'Angiography', 'Heart Surgery', 'Cardiac Rehabilitation'],
        iconName: 'FavoriteOutlined'
      },
      {
        title: 'Neurology',
        description: 'Expert neurological care for brain and nervous system disorders',
        keyServices: ['MRI', 'CT Scan', 'EEG', 'Stroke Treatment'],
        iconName: 'PsychologyOutlined'
      },
      {
        title: 'Orthopedics',
        description: 'Advanced treatment for bone, joint, and muscle conditions',
        keyServices: ['Joint Replacement', 'Fracture Care', 'Sports Medicine', 'Physiotherapy'],
        iconName: 'AccessibleOutlined'
      },
      {
        title: 'Pediatrics',
        description: 'Specialized healthcare for infants, children, and adolescents',
        keyServices: ['Vaccination', 'Growth Monitoring', 'Child Development', 'Emergency Care'],
        iconName: 'ChildCareOutlined'
      }
    ]);
    console.log(`✅ Created ${services.length} sample services`);

    console.log('\n📋 Login Credentials:');
    console.log('Admin 1: admin@hospital.com / Admin@123');
    console.log('Admin 2: suryasekar626@gmail.com / Surya@123');
    console.log('User: john@example.com / user123');

    mongoose.connection.close();
    console.log('\n✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();
