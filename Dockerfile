# Multi-stage Dockerfile for Frontend-Perfume (Angular / Ionic SPA)

# Stage 1: Build Angular application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies with legacy peer deps for stability
RUN npm install --legacy-peer-deps

# Copy application source code
COPY . .

# Build production bundle
RUN npm run build -- --configuration production

# Stage 2: Production Web Server with Nginx Alpine
FROM nginx:alpine

# Remove default nginx html and config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder stage (Ionic/Angular outputs to www)
COPY --from=builder /app/www /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
