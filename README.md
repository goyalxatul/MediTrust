# Encrypt & Upload File Securely

## Overview
This project provides a React-based file encryption and upload system. It allows users to:

- Encrypt files using AES encryption.
- Upload encrypted files to AWS S3.
- Store file metadata in an RDS database.
- Download and decrypt files.
- Drag and drop files for upload.

## Features
- **File Encryption**: Uses CryptoJS to encrypt files with a user-provided password.
- **Drag & Drop Upload**: Allows users to drag and drop files for easy selection.
- **Progress Bar**: Displays upload progress in real-time.
- **Secure Storage**: Uploads files to Amazon S3 and saves metadata in an RDS database.
- **Download Encrypted Files**: Provides an option to download the encrypted file.

## Tech Stack
- **Frontend**: React, Tailwind CSS, CryptoJS, Axios
- **Backend**: Node.js, Express, Multer, AWS SDK, MySQL (RDS)
- **Storage**: Amazon S3
- **Database**: Amazon RDS (MySQL/PostgreSQL)

## Installation & Setup
### Prerequisites
- Node.js installed
- AWS S3 bucket and IAM credentials
- RDS instance configured

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   AWS_ACCESS_KEY=your_aws_access_key
   AWS_SECRET_KEY=your_aws_secret_key
   S3_BUCKET_NAME=your_s3_bucket_name
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm run dev
   ```

## Usage
1. Open the web application in your browser.
2. Drag and drop a file or click to select one.
3. Enter a password for encryption.
4. Click **Upload to S3** to encrypt and upload.
5. Download the encrypted file if needed.

## API Endpoints
### Upload File
```
POST /api/upload
```
- Uploads an encrypted file to S3 and stores metadata in RDS.

### Download File
```
GET /api/download/:filename
```
- Retrieves the encrypted file from S3.

## License
This project is licensed under the MIT License.


