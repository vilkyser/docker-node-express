FROM node:latest
WORKDIR /api
ADD . .
RUN npm install
CMD ["node","api.js"]