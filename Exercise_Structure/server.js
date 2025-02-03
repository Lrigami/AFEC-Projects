const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./controllers/userController');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlPaser: true,
    useUnifiedTypology: true
}).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server started on http//:localhost:${PORT}`));
}).catch(err => console.log(err));
