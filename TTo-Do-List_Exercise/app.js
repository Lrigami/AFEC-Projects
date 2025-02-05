// To-Do-List Exercise 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlPaser: true,
    useUnifiedTypology: true
}).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server started on http//:localhost:${PORT}`);
        console.log(`Documentation available on http://localhost:${PORT}/api-docs`);
    });
}).catch(err => console.log(err));