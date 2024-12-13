# Stage 1: Compile and Build angular codebase
FROM node:16.20-alpine AS build

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json package-lock.json vcs-material-2.0.0.tgz ./


RUN npm config set strict-ssl false
RUN npm config set proxy http://192.168.5.8:3128
RUN npm config set https-proxy http://192.168.5.8:3128

# Install all the dependencies
RUN npm install --force

# Copy files form local machines
COPY . .

# Generate the build of the application
ARG MODE
ENV MODE $MODE
RUN echo "Environment: ${MODE}"
RUN npm run build:${MODE}

# Stage 2: Serve app with nginx server

# Use official nginx image as the base im
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist/nms-cloudrity /usr/share/nginx/html
COPY cicd/nginx.conf  /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
