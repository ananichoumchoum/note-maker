const express = require('express');
const cors = require('cors');
require('dotenv').config();
const noteRoutes = require('./routes/note-maker');

const app = express();
const PORT = process.env.PORT || 8080; 

// Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded requests

app.use('/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
