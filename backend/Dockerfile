# express-api/Dockerfile
FROM node:2-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["node", "index.js"]  # Replace with your actual entry file
