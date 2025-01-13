// /models/Blacklist.js
import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true, // Ensure each token is unique in the blacklist
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

const Blacklist = mongoose.model("Blacklist", blacklistSchema);

export default Blacklist;
