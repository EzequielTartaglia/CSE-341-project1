// Contact.js
const mongoose = require('mongoose');

// Define schema
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favoriteColor: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
});

// Create model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
