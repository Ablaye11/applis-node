

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 4000;

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
require('dotenv').config();
// Connexion à la base de données MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Tester la connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
    connection.query('SELECT * FROM utilisateurs', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des utilisateurs');
        } else {
            res.render('index', { utilisateurs: results });
        }
    });
});

// Route pour afficher le formulaire d'ajout d'utilisateur
app.get('/add-utilisateur', (req, res) => {
    res.render('add-utilisateur');
});

// Route pour traiter l'ajout d'utilisateur
app.post('/add-utilisateur', (req, res) => {
    const { nom, email, password } = req.body;
    connection.query(
        'INSERT INTO utilisateurs (nom, email, password) VALUES (?, ?, ?)',
        [nom, email, password],
        (err, results) => {
            if (err) {
                res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
            } else {
                res.redirect('/');
            }
        }
    );
});

// Route pour afficher le formulaire de modification d'utilisateur
app.get('/edit-utilisateur/:id', (req, res) => {
    const utilisateurId = req.params.id;
    connection.query('SELECT * FROM utilisateurs WHERE id = ?', [utilisateurId], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
        } else {
            res.render('edit-utilisateur', { utilisateur: results[0] });
        }
    });
});

// Route pour traiter la modification d'utilisateur
app.post('/edit-utilisateur/:id', (req, res) => {
    const utilisateurId = req.params.id;
    const { nom, email, password } = req.body;
    connection.query(
        'UPDATE utilisateurs SET nom = ?, email = ?, password = ? WHERE id = ?',
        [nom, email, password, utilisateurId],
        (err, results) => {
            if (err) {
                res.status(500).send('Erreur lors de la modification de l\'utilisateur');
            } else {
                res.redirect('/');
            }
        }
    );
});

// Route pour supprimer un utilisateur
app.get('/delete-utilisateur/:id', (req, res) => {
    const utilisateurId = req.params.id;
    connection.query('DELETE FROM utilisateurs WHERE id = ?', [utilisateurId], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
        } else {
            res.redirect('/');
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});