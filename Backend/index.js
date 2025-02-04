const express = require('express');
const connectToMongo=require('./Mongoose');
const app = express();
const cors=require('cors');
const mongoURI = 'mongodb://0.0.0.0:27017/inotebook';
const port = 4000;
// Connect to MongoDB
connectToMongo(mongoURI);
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