# backend/Dockerfile

# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package manifests and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your app listens on
EXPOSE 5001

# Default command
CMD ["node", "server.js"]
