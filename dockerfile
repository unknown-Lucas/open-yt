# Base image
FROM node:20.6.0

# Install Python 3 (for Debian-based Node image)
RUN apt-get update && apt-get install -y python3

# Set the working directory
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the API port
EXPOSE 3000

# Set the default command to run the API
CMD ["node", "dist/main"]
