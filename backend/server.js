const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const db = require("./db"); 


const app = express();
app.use(cors());
app.use(express.json());

app.enable('trust proxy');

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    // Don't redirect to https, let Cloudflare handle it
    next();
  } else {
    next();
  }
});


const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  let fileName = req.file.originalname;
  if (!fileName.endsWith(".enc")) {
    fileName += ".enc";
  }

  const params = {
    Bucket: "meditrustapk",
    Key: `encrypted-files/${fileName}`,
    Body: req.file.buffer,
    ContentType: "application/octet-stream",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    res.json({ message: "File uploaded successfully", url: `https://meditrustapk.s3.us-east-2.amazonaws.com/encrypted-files/${fileName}` });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file to S3", details: error.message });
  }
});

app.post("/save-metadata", (req, res) => {
  const { Name, Age, Gender, Illness, DoctorName, Prescription } = req.body;

  const sql = `
    INSERT INTO metadata (name, age, gender, illness, doctor_name, prescription)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [Name, Age, Gender, Illness, DoctorName, Prescription], (err, result) => {
    if (err) {
      console.error("Error inserting metadata:", err);
      return res.status(500).json({ error: "Failed to save metadata" });
    }
    res.status(200).json({ message: "Metadata saved successfully", id: result.insertId });
  });
});


app.listen(5001, () => console.log("Server running on port 5001"));
