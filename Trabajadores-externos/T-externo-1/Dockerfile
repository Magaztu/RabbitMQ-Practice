FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
