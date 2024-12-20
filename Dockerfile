# syntax=docker/dockerfile:1
FROM node:18-bullseye-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy app source
COPY . .

# Expose port
EXPOSE 8000

# Start app
CMD ["npm", "start"]
