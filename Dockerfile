# base image
FROM node:18

# set working directory inside conatiner
WORKDIR /app

# copy package files and install dependencies
COPY package*.json ./
RUN npm install

# copy the entire project into the container
COPY . .

# expose the port the app runs on
EXPOSE 3000

# start the app
CMD ["node", "index.js"]

