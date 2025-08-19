# Use Node.js 18 Alpine for a smaller image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies temporarily (including dev dependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Remove dev dependencies to create a smaller production image
RUN npm ci --only=production

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port (if needed for future web interface)
EXPOSE 3000

# Default command - keep container running
CMD ["sh", "-c", "echo 'Container is ready. Use docker-compose exec to run commands.' && tail -f /dev/null"]
