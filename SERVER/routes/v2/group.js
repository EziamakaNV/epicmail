const express = require('express');

const Router = express.Router();

const groupController = require('../../controller/v2/Group');

Router.post('/', groupController.createGroup);

module.exports = Router; // Export group router
