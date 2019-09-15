FROM node:10

WORKDIR /app 

COPY package.json package.json 

RUN npm install 

EXPOSE 3000 

RUN npm install -g nodemon sequelize-cli

CMD [ "nodemon", "index.js" ] 