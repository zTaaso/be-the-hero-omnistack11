const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const OngController = require('./controllers/OngController');
const incidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const OngValidators = require('./validators/OngValidators');
const IncidentValidators = require('./validators/IncidentValidators');
const SessionValidators = require('./validators/SessionValidators');

const routes = express.Router();

routes.get('/ongs', OngController.index); // list all registered ongs
routes.post('/ongs', OngValidators.dataValidator(), OngController.store); // register a new ong

routes.post('/sessions', SessionValidators.dataValidator(), SessionController.create) // create a session with a registered ong

routes.post('/incidents', IncidentValidators.dataValidator(), incidentsController.store) // register a new incident
routes.get('/incidents', incidentsController.index) // list all incidents

routes.delete('/incidents/:id', IncidentValidators.routeParamsValidator(), incidentsController.delete) // delete a incident

routes.get('/profile', OngValidators.headerValidator(), ProfileController.index) // list all incidents of a especific ong
routes.delete('/profile', OngValidators.headerValidator(), ProfileController.delete) // delete a especific ong

module.exports = routes;