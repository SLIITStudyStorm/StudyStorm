# Use node 16 as the base image
FROM node:21.7-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Start a new stage for serving the built application
FROM nginx:alpine

# Copy the built application from the previous stage to the NGINX web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
