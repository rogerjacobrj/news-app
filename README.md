# News App (React + TypeScript + Vite + Docker Setup)

This project features a fully functional news listing web application with filtering, sorting, and infinite scrolling, and user preferences for source & category.

## Preview

The application can be accessed using the following link

- Visit [https://news-app.rogerjacob.com](https://news-app.rogerjacob.com) to view the application online

## Requirements

For development, you will need Node.js, npm, and Docker installed in your environment.

### Node
- #### Node installation
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

After successful installation, you should be able to run the following commands to verify the installation.

    $ node --version
    v20.11.1

    $ npm --version
    10.2.4

### Docker
- #### Docker installation
  You can find more information about the installation on the [official Docker website](https://www.docker.com/get-started/)
---

  
## How do you set up the project on a local machine?
- ### Clone the repository
    ```$ git clone https://github.com/rogerjacobrj/news-app.git```
- ### Install dependency packages
    ```$ npm install```
- ### Create a .env file in the root folder with the following variable
    ```$ VITE_API_URL```
---

## How to run the project?
- ### Run the command to create a Docker image
  ```$ docker build -t news-web-app .```
- ### Run the command to start a Docker container
  ```$ docker run --rm --env-file .env -p 3001:5173 --name news-app news-web-app```
- ### Run the command to stop the container
  ```$ docker stop news-app```

## How to view the application?
- ### URL
  You can visit the link http://localhost:3001 or [click here](http://localhost:3001/)
  
## How to build the app for deployment?
- ### Run the command
  ```npm run build```