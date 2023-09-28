import multer from "multer";

const storage = multer.memoryStorage(); // to store the file as a buffer in memory
export const upload = multer({ storage: storage });