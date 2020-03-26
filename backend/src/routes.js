const express = require('express');

const OngController = require('./controllers/OngController');
const incidentsController = require('./controllers/incidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.post('/sessions', SessionController.create)

routes.post('/incidents', incidentsController.store)
routes.get('/incidents', incidentsController.index)
routes.delete('/incidents/:id', incidentsController.delete)

routes.get('/profile', ProfileController.index)

module.exports = routes;