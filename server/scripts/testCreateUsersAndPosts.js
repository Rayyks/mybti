import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const createUsersAndPosts = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear existing users and posts
    await User.deleteMany({});
    await Post.deleteMany({});

    // Create users
    const users = [
      { username: "user1", email: "user1@example.com", password: "password1" },
      { username: "user2", email: "user2@example.com", password: "password2" },
      { username: "user3", email: "user3@example.com", password: "password3" },
    ];

    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new User({
          ...user,
          password: hashedPassword,
        });
        return await newUser.save();
      })
    );

    console.log("Users created:", createdUsers);

    // Create posts for each user
    const posts = createdUsers.map((user, index) => ({
      content: `This is post ${index + 1} by ${user.username}`,
      author: user._id,
    }));

    const createdPosts = await Post.insertMany(posts);

    console.log("Posts created:", createdPosts);

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating users and posts:", error);
    mongoose.connection.close();
  }
};

createUsersAndPosts();
