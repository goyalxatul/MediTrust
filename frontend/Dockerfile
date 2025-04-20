# frontend/Dockerfile (development)
FROM node:18

# Install and cache dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source and start dev server
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
