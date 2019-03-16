/* eslint-disable no-console */
import express from 'express';

import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';

// Importing routes
import mailRoute from './routes/mail';

import userRoute from './routes/user';

import groupRoute from './routes/v2/group';

const app = express();

const swaggerDocument = require('./swagger.json');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRoute);

app.use('/api/v1/messages', mailRoute);

app.use('/api/v2/groups', groupRoute);

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
export default app;
