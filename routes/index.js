module.exports = {
	getHomePage: (req, res) => {
		console.log('Home page route accessed');
		// TODO: Make query for games list
		let query = `SELECT g.id, g.name, g.category, g.description, MAX(gs.session_date) AS latest_session 
			FROM games g
            LEFT JOIN game_sessions gs ON g.id = gs.game_id
            GROUP BY g.id
            ORDER BY g.name;
			`;

		db.query(query, (err, games) => {
			if (err) {
				console.error('Error:', err);
				res.status(500).send('Database error');
				return;
			}
			console.log('Games Fetched:', games);
			res.render('index.ejs', {
				title: 'Board Games | View Games',
				games
			});
		});
	}
};
