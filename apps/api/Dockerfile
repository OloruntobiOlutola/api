FROM node

# Install some dependencies
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./

#Default command
CMD [ "npm", "run", "start:dev", "api" ]