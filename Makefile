nodemon:
	nodemon --exec DEBUG=http* babel-node -- src/server/bin/server.js

build:
	npm run buildServer