/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';

import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';

// Importing routes
import mailRoute from './routes/mail';

import userRoute from './routes/user';

import groupRoute from './routes/group';

import viewsRoute from './routes/views';

const app = express();

const swaggerDocument = require('./swagger.json');

app.use(cookieParser());

app.use(express.static('UI'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile('/UI/Signin.html', { root: process.cwd() }));

app.use('/views', viewsRoute);

app.use('/api/v1/auth', userRoute);

app.use('/api/v1/messages', mailRoute);

app.use('/api/v1/groups', groupRoute);

// Swagger API doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Executes when request path does not match any of the handlers
app.use((req, res) => {
  res.status(404).sendFile('/UI/Notfound.html', { root: process.cwd() });
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    console.log('App listening on port 8080');
  });
}


// Export app for tests
export default app;
