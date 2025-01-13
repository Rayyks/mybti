// server.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js"; // Import app.js to run it

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Start the server using app.js
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
