## Welcome to In.security!

In.security is an encryption-protected journaling application. It serves to provide the user reassurance that their thoughts will be safe in an online world with increasing privacy concerns

![Alt Text](https://media.giphy.com/media/yUjsQNcMOko42wse8w/giphy.gif)<br/>


### Installation
* Clone the GitHub repository.
* Run npm install in the base directory.
* Use  PostgreSQL to create a database user with a password using
* cd into the backend directory.
* Create a .env file with: DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, JWT_SECRET, JWT_EXPIRES_IN
* Run npx dotenv sequelize-cli db:create.
* Run npx dotenv sequelize-cli db:migrate.
* Run npx dotenv sequelize-cli db:seed:all.
* Run npm start in both frontend and backend folders to start the server

### Tools
In.security uses various technologies to create a dynamic and unique web application. The front end is built with React and Redux and the back end is built with Express, Sequelize and PostgreSQL.

<a href="https://www.npmjs.com/package/crypto-js"><img alt="crypto-js" src="https://img.shields.io/badge/-CryptoJS-brightgreen" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
<a href="https://www.heroku.com/"><img src="https://img.shields.io/badge/-Heroku-430098?logo=Heroku" /></a>
<a href="https://www.npmjs.com/package/express"><img src="https://img.shields.io/badge/-Express.js-000000?logo=Express" /></a>
<a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL" /></a>
<a href="https://reactjs.org/"><img src="https://img.shields.io/badge/-React-61DAFB?logo=React&logoColor=333333" /></a>
<a href="https://redux.js.org/"><img src="https://img.shields.io/badge/-Redux-764ABC?logo=Redux" /></a>
<a href="https://sequelize.org/"><img src="https://img.shields.io/badge/-Sequelize-039BE5" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/-HTML5-E34F26?logo=HTML5&logoColor=ffffff" /></a>
<a href="#"><img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" /></a>
<a href="https://www.npmjs.com/"><img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" /></a>

### Key Features


Utilizes CryptoJS to provide client-side encryption of each entry before getting stored in the database. This adds an extra layer of security by ensuring that entries are never sent as plain text and are only broadcasted as encrypted text. The server never sees the user's entries in plaintext form.

Additionally, the user is protected with a bcryptjs hashing function on the backend and auth routes on the frontend to create restricted access to certain routes.

Another layer of protection is provided with a tailored algorithm to determine the duration of decrypted rendering of an entry based on the character count of each individual entry and the average human reading speed.

<br/>
![Alt Text](https://media.giphy.com/media/NFA8SCyu8QybvFvgpf/giphy.gif)
![Alt Text](https://media.giphy.com/media/gNP20j8FtUSQNf0tVV/giphy.gif)
<br/>

After three decryption attempts, "panic mode" will be triggered and the user will be forced to enter their session password.<br/>Three wrong attempts and the user is signed out and the entry is moved to the vault.<br/>Entries in th vault are only recoverable using the user's recovery session password. <br/>Three wrong recovery attempts results in permanent deletion of the entry.

![Alt Text](https://media.giphy.com/media/HnR7WJzpCvomGQfGeF/giphy.gif)<br/>
