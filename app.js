// app.js
// Main entry point for application

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { getHomePage } = require('./routes/index');
const game = require('./routes/game');
const game_session = require('./routes/game_session');
require("dotenv").config()

// TODO: application port should come from config file

const dbConfig = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};
let connectionAttempts = 0;

// TODO: database connection parameters should come from config file

function connectWithRetry() {
	connectionAttempts++;
	const db = mysql.createConnection(dbConfig);

	db.connect((err) => {
		if (err) {
			console.error(`Database connection failed (attempt ${connectionAttempts}):`, err);
			if (connectionAttempts < 10) {
				console.log('Retrying in 5 seconds...');
				setTimeout(connectWithRetry, 5000);
			} else {
				console.error('Max connection attempts reached. Exiting...');
				process.exit(1);
			}
		} else {
			console.log('Connected to database');
			global.db = db;
		}
	});
}

connectWithRetry();

// const db = mysql.createConnection({
// 	host: process.env.DB_HOST || 'localhost',
// 	port: process.env.DB_PORT || 3307,
// 	user: process.env.DB_USER || 'rahul',
// 	password: process.env.DB_PASSWORD || 'Something',
// 	database: process.env.DB_NAME || 'miechallenge'
// })

// db.connect((err) => {
// 	if (err) {
// 		throw err;
// 	}
// 	console.log('Connected to database');
// });

// global.db = db;


const frontend_port = 3011;
app.set('view engine', 'ejs');
app.set('port', frontend_port);
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));

// If there are static files, make a public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', getHomePage);
app.get('/add-game', game.getAdd);
app.post('/add-game', game.postAdd);
app.get('/edit-game/:id', game.getEdit);
app.post('/edit-game/:id', game.postEdit);
app.get('/add-game-session', game_session.getAdd);
app.post('/add-game-session', game_session.postAdd);
app.get('/test', (req, res) => {
	console.log('Test route accessed');
	res.send('Test route is working');
});

app.listen(frontend_port, () => {
	console.log(`Server running at http://localhost:${frontend_port}/`);
});
