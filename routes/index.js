module.exports = {
	getHomePage: (req, res) => {
		// TODO: Make query for games list
		let query = `SELECT g.id, g.name, g.category, g.description, MAX(gs.session_date) AS latest_session 
			FROM games g
            LEFT JOIN game_sessions gs ON g.id = gs.game_id
            GROUP BY g.id
            ORDER BY g.name;
			`;

		db.query(query, (err, result) => {
			if (err) {
				throw err;
			}
			res.render('index.ejs', {
				title: 'Board Games | View Games',
				players: result
			});
		});
	}
};
