const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/hello', function(req, res) {
    res.send("Tout est ok");
});

app.get('/users', function(req, res) {
    res.send("users ok");
})

app.get('/users/:id', function(req, res) {
    console.log("ok");
    res.send(req.params.id);
})

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
    console.log('Documentation available on http://localhost:3000/api-docs')
});