# Use Node.js 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire source directory to the container
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Specify the command to run your app using nodemon
CMD ["npm", "start"]
