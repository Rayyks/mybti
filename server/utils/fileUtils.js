// fileUtils.js
export const checkFileSize = (file, maxSize = 10 * 1024 * 1024) => {
  // Default 10MB
  if (file.size > maxSize) {
    throw new Error(`File size exceeds the ${maxSize / 1024 / 1024}MB limit`);
  }
  return true;
};

export const sanitizeFileName = (fileName) => {
  return fileName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "");
};
