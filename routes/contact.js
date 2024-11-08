const routes = require('express').Router();
const contacts = require('../controllers/contact.js');

routes.get('/', contacts.findAll);
routes.get('/:contact_id', contacts.findOne);

routes.post('/', contacts.create);

routes.put('/:contact_id', contacts.update);

module.exports = routes;
