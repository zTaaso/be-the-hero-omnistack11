const express = require('express');

const OngController = require('./controllers/OngController');
const incidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index); // list all registered ongs
routes.post('/ongs', OngController.store); // register a new ong

routes.post('/sessions', SessionController.create) // create a session with a registered ong

routes.post('/incidents', incidentsController.store) // register a new incident
routes.get('/incidents', incidentsController.index) // list all incidents
routes.delete('/incidents/:id', incidentsController.delete) // delete a incident

routes.get('/profile', ProfileController.index) // list all incidents of a especific ong
routes.delete('/profile', ProfileController.delete) // delete a especific ong

module.exports = routes;