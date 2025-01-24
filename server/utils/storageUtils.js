import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteImageFromStorage = (imagePath) => {
  const imageFilePath = path.join(__dirname, "..", "uploads", imagePath);

  if (fs.existsSync(imageFilePath)) {
    fs.unlink(imageFilePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        console.log("Image deleted successfully:", imageFilePath);
      }
    });
  } else {
    console.log("Image not found, nothing to delete:", imageFilePath);
  }
};
