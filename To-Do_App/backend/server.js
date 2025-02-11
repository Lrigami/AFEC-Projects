// To-Do-List Exercise 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const taskRoutes = require('./routes/taskRoutes');
const todolistsRoutes = require('./routes/todolistsRoutes');
const connectDB = require('./config/config');
const port = process.env.PORT;
const app = express();
connectDB();

app.use(cors()); 
app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api', todolistsRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    console.log(`Documentation available on http://localhost:${port}/api/docs`);
});