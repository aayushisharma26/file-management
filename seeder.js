import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/userModel.js'; // Adjust path if needed

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('password123', 10); // Replace 'password123' with desired password
    const user = new User({ email: 'test@example.com', password: hashedPassword });

    await user.save();
    console.log('User added successfully');

    mongoose.connection.close();
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));
