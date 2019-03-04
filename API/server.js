/* eslint-disable no-console */
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Entity Specifications
const User = [{
  id: 123,
  email: 'example@test.com',
  firstName: 'James',
  lastName: 'Dee',
  password: 'notell',
}];

// eslint-disable-next-line no-unused-vars
const Contacts = [{
  id: '123',
  email: 'example@test.com',
  firstName: 'James',
  lastName: 'Dee',
}];

// eslint-disable-next-line no-unused-vars
const Messages = [{
  id: 3434,
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Subject',
  message: 'lofmifigifng  djkdskinaidpo jnjdnfjndf',
  parentMessageId: 34545,
  status: 'sent', // draft, sent or read
}];

// eslint-disable-next-line no-unused-vars
const Sent = [{
  senderId: 54646,
  messageId: '34r45',
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
}];

// eslint-disable-next-line no-unused-vars
const Inbox = [{
  receiverId: 35565,
  messageId: 'er45t',
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

// Route handlers
app.post('/api/v1/auth/signup', (req, res) => {
  if ((req.body.firstName) && (req.body.lastName) && (req.body.userName) && (req.body.password)) {
    const position = User.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
    });
    res.status(200).json({ status: 200, data: { position, details: User[position - 1] } });
  } else {
    res.status(400).json({ status: 400, error: 'Missing parameter' });
  }
});

app.listen(8080, () => {
  console.log('App listening on port 8080');
});

// Export app for tests
module.exports = app;
