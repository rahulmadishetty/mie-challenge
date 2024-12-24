module.exports = {
	getAdd: (req, res) => {
		const query = `SELECT id, name FROM games`;
		db.query(query, (err, games) => {
			if (err) throw err;
			res.render('add-game-session.ejs', { title: 'Add Game Session', games });
		});
	},
	postAdd: (req, res) => {
		console.log(req.body);
		const { game_id, session_date, players_count, duration, location, notes } = req.body;
		const query = `INSERT INTO game_sessions (game_id, session_date, players_count, duration, location, notes) VALUES (?, ?, ?, ?, ?, ?)`;
		// TODO db.query to insert game-playing session
		db.query(query, [game_id, session_date, players_count, duration, location, notes], (err) => {
			if (err) throw err;
			res.redirect('/');
		});
	},
};
