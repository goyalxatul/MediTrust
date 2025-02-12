require("dotenv").config();
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const { Sequelize, DataTypes } = require("sequelize");
const CryptoJS = require("crypto-js");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Set up Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

const FileUpload = sequelize.define("FileUpload", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fileName: { type: DataTypes.STRING, allowNull: false },
  fileType: { type: DataTypes.STRING, allowNull: false },
  s3Url: { type: DataTypes.STRING, allowNull: false },
});

sequelize.sync();

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded." });

  const { password } = req.body;
  if (!password) return res.status(400).json({ message: "Password is required." });

  // Encrypt file
  const fileBuffer = req.file.buffer;
  const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(fileBuffer));
  const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();

  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}_${req.file.originalname}.enc`,
    Body: encrypted,
    ContentType: "text/plain",
  };

  try {
    const s3Upload = await s3.upload(s3Params).promise();
    const newFile = await FileUpload.create({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      s3Url: s3Upload.Location,
    });

    res.status(200).json({ message: "File uploaded successfully", file: newFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "S3 upload failed", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

