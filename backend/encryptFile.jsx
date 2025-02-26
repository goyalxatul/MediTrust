

import crypto from "crypto";
import path from "path";
import fs from "fs";

// AES-256-GCM Parameters
const ALGORITHM = "aes-256-gcm";
const KEY_SIZE = 32; // 256-bit key
const IV_SIZE = 16;  // 128-bit IV
const TAG_SIZE = 16; // Authentication Tag Size

// Generate a random encryption key (store this securely)
const generateKey = () => crypto.randomBytes(KEY_SIZE).toString("hex");

// Encrypt File
const encryptFile = (filePath, encryptionKey) => {
  const iv = crypto.randomBytes(IV_SIZE);
  const key = Buffer.from(encryptionKey, "hex");

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(`${filePath}.enc`);

  const authTag = cipher.getAuthTag();
  output.write(iv);
  input.pipe(cipher).pipe(output);

  output.on("finish", () => {
    fs.writeFileSync(`${filePath}.tag`, authTag);
    console.log(`File encrypted successfully: ${filePath}.enc`);
  });
};

// Decrypt File
const decryptFile = (encryptedFilePath, encryptionKey) => {
  const key = Buffer.from(encryptionKey, "hex");

  const encryptedFile = fs.readFileSync(encryptedFilePath);
  const iv = encryptedFile.slice(0, IV_SIZE);
  const authTag = fs.readFileSync(`${encryptedFilePath.replace(".enc", ".tag")}`);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decryptedData = Buffer.concat([
    decipher.update(encryptedFile.slice(IV_SIZE)),
    decipher.final(),
  ]);

  const originalFilePath = encryptedFilePath.replace(".enc", "");
  fs.writeFileSync(originalFilePath, decryptedData);
  console.log(`File decrypted successfully: ${originalFilePath}`);
};

// Example Usage
const key = generateKey();
console.log("Encryption Key:", key);
encryptFile("test.pdf", key); // Encrypt a sample PDF file
decryptFile("test.pdf.enc", key); // Decrypt it back
