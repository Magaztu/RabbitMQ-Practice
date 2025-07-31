FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

# Step 4: Install the dependencies
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
