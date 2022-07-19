FROM node:18.6

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 5000

ENTRYPOINT ["npm", "start"]
