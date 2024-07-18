# Stage 1: Build Stage
FROM node:18.2.0-alpine 

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

# Copy Certificates
COPY cert/ /etc/ssl/certs/

# Install Modules
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
