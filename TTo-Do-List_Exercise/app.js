// To-Do-List Exercise 
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/config');
const port = 3000;
const app = express();
connectDB();

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server started on http//:localhost:${port}`);
    console.log(`Documentation available on http://localhost:${port}/api-docs`);
});