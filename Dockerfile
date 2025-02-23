# Use an official Node.js runtime as the base image
FROM node:22.14.0-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port React runs on
EXPOSE 5173

# Start the React app
CMD ["npm", "run", "dev"]
