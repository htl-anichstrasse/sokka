FROM node:10
WORKDIR /usr/src/server

# copy package files
COPY package*.json ./

# install dependencies
RUN npm install
RUN npm install -g gulp

# build
COPY . .
RUN gulp build

# run
CMD [ "node", "dist" ]
