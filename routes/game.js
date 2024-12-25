module.exports = {
	getAdd: (req, res) => {
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},
	getEdit: (req, res) => {
		const id = req.params.id;
		const query = `SELECT * FROM games WHERE id=?`;
		db.query(query, [id], (err, result) => {
			if (err) throw err;
			res.render('edit-game.ejs', { title: 'Board Games | Edit game', game: result[0] });
		});
	},
	postAdd: (req, res) => {
		// TODO db.query to insert game
		const { name, description, category, max_players, min_players, average_duration } = req.body;
		const query = `INSERT INTO games (name, description, category, max_players, min_players, average_duration) VALUES(?, ?, ?, ?, ?, ?)`;
		// If all went well, go back to main screen
		db.query(query, [name, description, category, max_players, min_players, average_duration], (err) => {
			if (err) throw err;
			res.redirect('/');
		});
	},
	postEdit: (req, res) => {
		console.log('Form Data Received:', req.body);
		const { id, name, description, category, max_players, min_players, average_duration } = req.body;

		const query = `UPDATE games SET name = ?, description = ?, category = ?, max_players = ?, min_players = ?, average_duration = ? WHERE id=?`;

		// TODO db.query to update game

		db.query(query, [name, description, category, max_players, min_players, average_duration, id], (err) => {
			if (err) {
				console.error('Database update error:', err);
				res.status(500).send('Database error');
				return;
			};
			console.log('Game updated successfully');
			res.redirect('/');
		});
	},
};
