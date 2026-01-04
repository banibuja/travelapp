require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const sequelize = require('../db');
const User = require('../models/user');

async function createAdmin() {
  try {
    // Wait for database connection
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Default admin credentials (you can change these)
    const adminData = {
      firstName: 'Admin',
      lastName: 'User',
      number: '+383000000000',
      email: process.env.ADMIN_EMAIL || 'admin@travelapp.com',
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: {
        [Op.or]: [
          { email: adminData.email },
          { username: adminData.username }
        ]
      }
    });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Username: ${existingAdmin.username}`);
      console.log(`Role: ${existingAdmin.role}`);
      
      // Update role to admin if it's not already
      if (existingAdmin.role !== 'admin') {
        await existingAdmin.update({ role: 'admin' });
        console.log('User role updated to admin.');
      }
      
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    const admin = await User.create({
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      number: adminData.number,
      email: adminData.email,
      username: adminData.username,
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin Credentials:');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Username: ${admin.username}`);
    console.log(`  Password: ${adminData.password}`);
    console.log(`  Role: ${admin.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

// Run the script
createAdmin();

