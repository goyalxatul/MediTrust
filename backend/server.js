
import express from "express";
import multer from "multer";
import fs from "fs";
import crypto from "crypto";
import cors from "cors";

const app = express();
const upload = multer({ dest: "uploads/" });
const PORT = 5000;

// Enable CORS for frontend
app.use(cors());

// Generate Encryption Key
app.get("/generate-key", (req, res) => {
  const key = crypto.randomBytes(32).toString("hex");
  res.json({ key });
});

// Encrypt File
app.post("/encrypt", upload.single("file"), (req, res) => {
  const { path, originalname } = req.file;
  const encryptionKey = req.body.key;
  const iv = crypto.randomBytes(16);
  const key = Buffer.from(encryptionKey, "hex");

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const input = fs.createReadStream(path);
  const output = fs.createWriteStream(`uploads/${originalname}.enc`);

  output.write(iv);
  input.pipe(cipher).pipe(output);

  output.on("finish", () => {
    res.json({ message: "File encrypted successfully!", file: `${originalname}.enc` });
  });
});

// Decrypt File
app.get("/decrypt", (req, res) => {
  const { key } = req.query;
  const encryptedFile = "uploads/encrypted_file.enc";
  const iv = fs.readFileSync(encryptedFile).slice(0, 16);
  const encryptedData = fs.readFileSync(encryptedFile).slice(16);

  const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

  res.setHeader("Content-Disposition", "attachment; filename=decrypted_file");
  res.send(decrypted);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
