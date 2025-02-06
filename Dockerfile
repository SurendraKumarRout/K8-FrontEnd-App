# 1. Use Node.js as the build image
FROM node:16-alpine as build

# 2. Set the working directory
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the app and build it
COPY . .
RUN npm run build

# 5. Use Nginx as the base image for serving the built app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# 6. Expose the Nginx port
EXPOSE 80

# 7. Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
