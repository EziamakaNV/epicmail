/* eslint-disable no-console */
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const jwt = require('jsonwebtoken');

const config = require('./config');

const swaggerDocument = require('./swagger.json');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Entity Specifications
const User = [{
  id: 123,
  userName: 'example',
  email: 'example@epicmail.com',
  firstName: 'James',
  lastName: 'Dee',
  password: 'notell',
}];

// eslint-disable-next-line no-unused-vars
const Contacts = [{
  id: 123,
  email: 'James@test.com',
  firstName: 'James',
  lastName: 'Dee',
}];

// eslint-disable-next-line no-unused-vars
const Messages = [{
  id: 3434,
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Subject',
  message: 'lofmifigifng  djkdskinaidpo jnjdnfjndf',
  senderId: 1267,
  receiverId: 4567,
  parentMessageId: 34545,
  status: 'sent', // draft, sent or read
}, {
  id: 1234,
  createdOn: 'Tue Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'lorem Ipsum',
  message: 'Vivamus nec dolor est. In tellus ex, aliquet sed ipsum sed, cursus porta nisl. Phasellus id orci arcu. Maecenas quis posuere nisl, nec suscipit mi. Aenean faucibus, diam in efficitur feugiat, neque neque elementum ex, sit amet bibendum erat massa nec dolor. Integer sagittis, ',
  senderId: 2354,
  receiverId: 5445,
  parentMessageId: 2345,
  status: 'draft',
}, {
  id: 1235,
  createdOn: 'Wed Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'read',
}, {
  id: 1239,
  createdOn: 'Thur Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'read',
}, {
  id: 1238,
  createdOn: 'Fri Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'draft',
}, {
  id: 1267,
  createdOn: 'Sat Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'sent',
}, {
  id: 12390,
  createdOn: 'Sun Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'unread',
}, {
  id: 14653,
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'unread',
}, {
  id: 1345,
  createdOn: 'Tue Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'unread',
}];

// eslint-disable-next-line no-unused-vars
const Sent = [{
  senderId: 54646,
  messageId: 34545,
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
}];

// eslint-disable-next-line no-unused-vars
const Inbox = [{
  receiverId: 35565,
  messageId: '34545',
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
}];

// eslint-disable-next-line no-unused-vars
const Groups = [{
  id: 2690,
  name: 'Group 1',
}];

// eslint-disable-next-line no-unused-vars
const GroupMembers = [{
  groupId: 65656,
  memberId: 56563,
}];

function fetchMessages(typeOfMessage, request, response) {
  const messagesResponse = Messages.map((message) => {
    if (message.status === typeOfMessage) {
      return message;
    }
    return undefined;
  }).filter(message => message !== undefined); // Remove empty elements from array

  return response.status(200).json({ status: 200, data: [...messagesResponse] });
}

// Route handlers
app.post('/api/v1/auth/signup', (req, res) => {
  if ((req.body.firstName) && (req.body.lastName) && (req.body.userName) && (req.body.password)) {
    const position = User.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: `${req.body.userName}`,
      password: req.body.password,
      email: `${req.body.userName}@epicmail.com`,
    });
    const token = jwt.sign({ userName: req.body.userName }, config.secret, { expiresIn: '24h' });
    res.status(200).json({ status: 200, data: { token, position, details: User[position - 1] } });
  } else {
    res.status(400).json({ status: 400, error: 'Missing parameter' });
  }
});

app.post('/api/v1/auth/login', (req, res) => {
  if ((req.body.email) && (req.body.password)) {
    let isAuthenticated = false;
    let userIndex;
    User.forEach((user, index) => {
      if ((req.body.email === user.email) && (req.body.password === user.password)) {
        isAuthenticated = true;
        userIndex = index;
      }
    });
    if (isAuthenticated) {
      const token = jwt.sign({ email: req.body.email }, config.secret, { expiresIn: '24h' });
      res.status(200).json({ status: 200, data: { token, user: User[userIndex - 1] } });
    } else {
      res.status(401).json({ status: 401, error: 'Incorrect credentials' });
    }
  } else {
    res.status(400).json({ status: 400, error: 'Missing parameter' });
  }
});

app.get('/api/v1/messages', (req, res) => {
  // In the future add condition to filter message according to user
  const messagesResponse = Messages.map(message => message);
  res.status(200).json({ status: 200, data: [...messagesResponse] });
});

app.get('/api/v1/messages/unread', (req, res) => {
  // Fetch unread messages
  fetchMessages('unread', req, res);
});

app.get('/api/v1/messages/sent', (req, res) => {
  // Fetch sent messages
  fetchMessages('sent', req, res);
});

app.post('/api/v1/messages', (req, res) => {
  if ((req.body.senderId) && (req.body.receiverId) && (req.body.subject) && (req.body.message)) {
    const id = Math.floor((Math.random() * 10000)); // Generate Random Id
    const newMessagePosition = Messages.push({
      id,
      createdOn: Date(),
      subject: req.body.subject,
      message: req.body.message,
      senderId: Number(req.body.senderId),
      receiverId: Number(req.body.receiverId),
      parentMessageId: id,
      status: 'sent',
    });
    res.status(200).json({ status: 200, data: Messages[newMessagePosition - 1] });
  } else {
    res.status(400).json({ status: 400, error: 'Missing parameters' });
  }
});

app.route('/api/v1/messages/:messageId')
  .get((req, res) => {
    const reqMessageId = req.params.messageId;
    // Check if the message Id is an interger
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(reqMessageId)) {
      let newMessagePosition;
      // Search for email using messageId
      Messages.forEach((message, index) => {
        if (message.id === Number(reqMessageId)) {
          newMessagePosition = index;
        }
      });
      if (newMessagePosition >= 0) { // If the message was found
        res.status(200).json({ status: 200, data: Messages[newMessagePosition] });
      } else {
        res.status(404).json({ status: 404, error: 'Message not found' });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Bad request. Message Id must be an Integer' });
    }
  })
  .delete((req, res) => {
    const reqMessageId = req.params.messageId;
    // Check if the message Id is an interger
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(reqMessageId)) {
      let newMessagePosition;
      // Search for email using messageId
      Messages.forEach((message, index) => {
        if (message.id === Number(reqMessageId)) {
          newMessagePosition = index;
        }
      });
      if (newMessagePosition >= 0) { // If the message was found
        const { message } = Messages[newMessagePosition];// Retrieve the message propery
        Messages.splice(newMessagePosition, 1); // Then delete the message record
        res.status(200).json({ status: 200, data: { message } });
      } else {
        res.status(404).json({ status: 404, error: 'Message not found' });
      }
    } else {
      res.status(400).json({ status: 400, error: 'Bad request. Message Id must be an Integer' });
    }
  });

// Swagger API doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Executes when request path does not match any of the handlers
app.use((req, res) => {
  res.status(401).json({ error: 'Bad request! Endpoint does not exist!' });
});

app.listen(8080, () => {
  console.log('App listening on port 8080');
});

// Export app for tests
module.exports = app;
