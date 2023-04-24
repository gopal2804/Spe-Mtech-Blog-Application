# node version
FROM node:16.14.2-alpine

#This sets the working directory inside the container to /usr/src/app. This is where the application will be located.
WORKDIR /usr/src/app

#This copies the package.json and package-lock.json (if present) files from the host machine to the /usr/src/app directory in the container.
COPY package*.json ./

# run command to run the server
RUN npm install
RUN npm install cors

# This copies all the files and folders from the host machine to the /usr/src/app directory in the container.
COPY . .

# This exposes port 3000 on the container.
EXPOSE 5000

#This specifies the command to run when the container starts. In this case, it runs the npm start command, which starts the backend application.
CMD ["npm", "start"]