const express = require('express');
const connectDB = require('./routes/db/connectDB');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
const contactRoutes = require('./routes/contacts.js');
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
  res.send('Server running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
