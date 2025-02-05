// To-Do-List Exercise 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const taskRoutes = require('./routes/taskRoutes');
const port = 3000;
const app = express();

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlPaser: true,
    useUnifiedTypology: true
}).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server started on http//:localhost:${port}`);
        console.log(`Documentation available on http://localhost:${port}/api-docs`);
    });
}).catch(err => console.log(err));