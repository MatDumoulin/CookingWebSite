FROM node:8.9-alpine
ENV NODE_ENV production
ENV MYCOOKBOOK_DB mongodb://mycookingbook:~c2[hW-F#^`GpPrU@ds123500.mlab.com:23500/mycookbook
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g @angular/cli nodemon --silent && npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 4200
CMD npm start
