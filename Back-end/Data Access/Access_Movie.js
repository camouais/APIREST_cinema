const pool = require('../Database/config_database.js');

exports.createFilm = async (film) => {
    const { Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum, ID_utilisateur } = film;

    if (!Titre || !Annee || !Nom_Realisateur || !Duree || !Langue || !Sous_titres || !Age_minimum || !ID_utilisateur) {
        return null;
    }

    const [result] = await pool.query(
        'INSERT INTO Film (Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum, ID_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [Titre, Annee, Nom_Realisateur, Duree, Langue, Sous_titres, Age_minimum, ID_utilisateur]
    );

    return result.insertId;
};



exports.getFilmsByOwner = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM Film WHERE ID_utilisateur = ?', [userId]);
    return rows;
};

/*
exports.getFilmsByCity = async (city) => {
    const [rows] = await pool.query('SELECT * FROM Film WHERE city = ?', [city]);
    return rows;
};
*/

exports.getFilmsByCity = async (city) => {
    console.log("Je passe par getFilmsByCity");
    const [rows] = await pool.query('SELECT f.* FROM Film f, Programmation p WHERE f.ID_film = p.ID_film and p.ville = ?', [city]);
    return rows;
};

exports.getFilms = async () => {
    const [rows] = await pool.query('SELECT * FROM Film;');
    return rows;
};

