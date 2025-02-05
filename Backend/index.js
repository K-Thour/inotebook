const express = require('express');
require("dotenv").config();
const connectToMongo=require('./Mongoose');
const app = express();
const cors=require('cors');
const url = process.env.url;
const port = process.env.port;
// Connect to MongoDB
connectToMongo(url);
// Express Middleware
app.use(cors());
app.use(express.json());
// Available Routes
app.use("/inotebook/notes",require('./routes/notes'));
app.use("/inotebook/user",require('./routes/auth'));
// Default Route
app.get('/', (req, res) => {
    res.send("welcome to iNotebook backend");
});
// Listening on port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});