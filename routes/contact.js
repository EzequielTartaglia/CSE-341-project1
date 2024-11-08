const routes = require('express').Router();
const contacts = require('../controllers/contact.js');

routes.get('/', contacts.findAll);
routes.get('/:contact_id', contacts.findOne);

routes.post('/', contacts.create);

module.exports = routes;
