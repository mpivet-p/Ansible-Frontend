FROM node:18.6

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production
RUN npm install -g serve

COPY . .

RUN npm run build

ENV NODE_ENV=production

ENTRYPOINT ["serve", "-s", "build"]
