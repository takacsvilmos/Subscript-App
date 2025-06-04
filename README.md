# Subscript-App
Simple app that saves subscriptions to a database.
Tech stack: 
<div align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <br>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <br>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <br>
  <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" alt="MariaDB" />
</div>

To run the project locally:
  Run the following command to start MariaDB in a Docker container:
  ```
  docker run --name mariadb \
    -e MYSQL_ROOT_PASSWORD=my-secret-pw \
    -e MYSQL_DATABASE=my_database \
    -e MYSQL_USER=my_user \
    -e MYSQL_PASSWORD=my_password \
    -p 3306:3306 \
    -d mariadb:latest
  ```
   
  Create a .env file in the project root:
   ``` 
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=my_user
    DB_PASSWORD=my_password
    DB_NAME=my_database
   ```

  1. install dependencies - npm install
  2. start it in developer mode - npm run dev
  3. Open your browser and navigate to http://localhost:3000 to view the app.


