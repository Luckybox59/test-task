nodemon:
	nodemon --watch src/server --ignore src/server/usersDB.json --exec babel-node -- src/server/bin/server.js

build:
	npm run buildServer

develop:
	npm run dev