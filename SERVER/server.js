/* eslint-disable no-console */
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

// Importing routes
const mailRoute = require('./routes/mail');

const userRoute = require('./routes/user');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRoute);

app.use('/api/v1/messages', mailRoute);

// Swagger API doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Executes when request path does not match any of the handlers
app.use((req, res) => {
  res.status(401).json({ error: 'Bad request! Endpoint does not exist!' });
});

console.log(`node_env: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    console.log('App listening on port 8080');
  });
}


// Export app for tests
module.exports = app;
