# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure esbuild is at the latest version
RUN npm install esbuild@latest

# Copy the rest of the application code into the working directory
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Set the command to run the app
CMD ["serve", "-s", "build"]