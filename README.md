  <h1 align="center">GIT VISUALIZER</h1>
<p align="center">
  <img src="git.png" width="200" alt="Git Visualizer Logo Logo" />
</p>

# Git Visualizer API 1.0
This is the API of Git visualizer wihch in its first version provide the commits history of this project. 

## Description
This is a REST API developed in [Nest.js](https://github.com/nestjs/nest). The main purpose of this API is to connect with GitHub API in order to serve resources and information about projects and repositories.

## API urls
(local): http://localhost:3001/api/ <br />
(production): ... <br />

## 📒Dependencies
*Node.js* version 18 or above

   Download and install node.js in your computer using the following page [Node official page](https://nodejs.org/en).

*Nest.js* version 10 or above

   Install Nest CLI. Use this provided documentation [page](https://docs.nestjs.com/).
   ```
   npm i -g @nestjs/cli
   ```

## 📝Running the app

***1. Clone the repository***

   **Using HTTPS**
   ```
   git clone https://github.com/CarlosCSZ/Git_Visualizer_api.git
   ```
   **Using SSH KEY**<br />
   -Create and add ssh key in your computer.<br />
   -Attach your public ssh key into your GitHub account and write the following command.<br />
   ```
   git clone git@github.com:CarlosCSZ/Git_Visualizer_api.git
   ```

<br />***2. Install dependencies***<br />
  using <b>npm<b>
  ```bash
  $ pnpm install
  ```
  using <b>pnpm<b>
  ```bash
  $ pnpm install
  ```

<br />***3. Configure the environment variables***

   **Create a .env file using the .env.example file.**
   ```
    nano .env
   ```
   #or
   ```
    vim .env
   ```
   The default local settings are:<br />
    PORT=3001<br />
    NODE_ENV="dev"<br />
    GH_OWNER="CarlosCSZ"<br />
    
  --In case you want to try pulling information from your personal projects you may want to set the following variables:--<br />
    GH_TOKEN= as your personal access token<br />
    GH_OWNER= as your GitHub user<br />
    

<br />***4. Start the Backend app***

   **From the root directory**
   <br />--In case you use npm, replace "pnpm" for "npm".--
   ```
    # development
    $ pnpm run start

    # watch mode
    $ pnpm run start:dev

    # production mode
    $ pnpm run start:prod
  ```

   The app will be running at the following url http://localhost:3001/

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 📂 API Documentation

*****
Once you start the app, the documentation will be available on the following url(Local): http://localhost:3001/docs
