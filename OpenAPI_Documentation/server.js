let express = require(' express ');
let app = express();

app.get('/api/hello', function(req, res) {
    res.send("Tout est ok")
});