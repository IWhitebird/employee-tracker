// seed.js
import mongoose from 'mongoose';
import User from '../models/User';

import {usersData} from './user';

const seedDatabase = async () => {
  try {
    await User.deleteMany(); // Clear existing data

    await User.insertMany(usersData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    mongoose.disconnect(); // Close the database connection when done
  }
};

export default seedDatabase;
