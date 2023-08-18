FROM node:19.8-alpine
WORKDIR /app
COPY ./package*.json ./
COPY ./public ./
COPY ./README.md ./
RUN npm install
COPY ./src src/
CMD ["npm", "start"]