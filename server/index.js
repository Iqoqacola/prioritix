const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./src/routes/user.js');
const taskRoutes = require('./src/routes/task.js');
const sequelize = require('./src/config/DB.js');


dotenv.config({
    path: './.env.dev'
});

const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: process.env.ORIGIN,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions))
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Connect to Database
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});