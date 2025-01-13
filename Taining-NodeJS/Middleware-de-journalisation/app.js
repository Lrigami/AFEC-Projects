const express = require('express');
const fs = require('fs');
let app = express();

function logToFile(method, url, res) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    const logMessage = `${year}-${month}-${day} ${hour}, method: ${method}, URL: ${url}\n`;

    fs.appendFile('logs.log', logMessage, (err) => {
        if (err) {
            console.error('Erreur lors de l’écriture dans le fichier:', err);
            res.status(500).send('Erreur interne du serveur');
        } else {
            res.send('Log ajouté avec succès');
        }
    });
}

app.get('/', function(req, res) {
    logToFile(req.method, req.url, res);
})

app.get('/home', function(req, res) {
    logToFile(req.method, "Accueil", res);
});

app.post('/', function(req, res) {
    logToFile(req.method, req.url, res);
})

app.use(function(req, res, next) {
    console.log(`method: ${req.method}, URL: ${req.url}`);
    next();
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});