# Build stage
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.23.2-alpine

# Copy the build output to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY env.sh ./
COPY .env ./

# Expose port 80
EXPOSE 80

# Add bash and dos2unix
RUN apk add --no-cache bash dos2unix

# Convert line endings and make our shell script executable
RUN dos2unix env.sh && chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g 'daemon off;'"]
