# Use official Node.js image as base
FROM node:20.12.0 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application code and build the app
COPY . .
COPY .env .env
RUN npm run build

# Use a minimal server to serve static files
FROM nginx:stable-alpine

# Copy built files to NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and start NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
