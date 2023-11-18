import mongoose from 'mongoose';
import User from '../models/User';
import {usersData} from './userJsonData';

const seedDatabase = async () => {
  try {
    await User.deleteMany(); 

    await User.insertMany(usersData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    mongoose.disconnect(); 
  }
};

export default seedDatabase;
