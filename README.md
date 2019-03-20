[![Build Status](https://travis-ci.org/EziamakaNV/epicmail.svg?branch=ft-Implement-travis-ci-and-coveralls-164464671)](https://travis-ci.org/EziamakaNV/epicmail) [![Coverage Status](https://coveralls.io/repos/github/EziamakaNV/epicmail/badge.svg?branch=develop)](https://coveralls.io/github/EziamakaNV/epicmail?branch=develop)

### Project Overview
The internet is increasingly becoming an integral part of lives. Ever since the invention of
electronic mail by Ray Tomlinson, emails have grown to become the primary medium of
exchanging information over the internet between two or more people, until the advent of Instant
Messaging (IM) Apps.
As EPIC Andelans who work towards advancing human potential and giving back to the society,
we wish to empower others by building a web app that helps people exchange
messages/information over the internet.

### Technology Stack Used
- Coveralls
- Travis CI
- NodeJs
- Express
- ESLint
- Babel
- Mocha
- Chai
- Postgres SQL

### Feature Requirements

- Users can sign up.
- Users can login.
- Users can create groups.
- Users can send a message to individuals.
- Users can view their inbox and read messages.
- Users can retract sent messages.
- Users can save an email as draft and send it later or delete it.

### Requirements and Installation
Before running the project, install the following
- Node JS
- Git

#### To run
```$ git clone https://github.com/EziamakaNV/epicmail.git
$ cd EPIC-Mail
$ npm install
$ npm start```
#### To Test
```$ npm test```

## Relevant Links

### Pivotal Tracker stories
[https://www.pivotaltracker.com/n/projects/2314553](https://www.pivotaltracker.com/n/projects/2314553)

### UI Template
[https://eziamakanv.github.io/epicmail](https://eziamakanv.github.io/epicmail)

## API Endpoints

POST 'https://radiant-thicket-73219.herokuapp.com/auth/signup' - Allows a user to create an account

POST 'https://radiant-thicket-73219.herokuapp.com/api/v1/auth/login' - Allows a user to create an account

POST 'https://radiant-thicket-73219.herokuapp.com/api/v1/messages' - Sends a new message

GET 'https://radiant-thicket-73219.herokuapp.com/api/v1/messages/all' - Gets all messages

GET 'https://radiant-thicket-73219.herokuapp.com/api/v1/messages' - Gets all received messages

GET 'https://radiant-thicket-73219.herokuapp.com/api/v1/messages/sent' - Gets all sent messages

GET 'https://radiant-thicket-73219.herokuapp.com/api/v1/messages/unread' - Gets all unread messages

GET 'https://radiant-thicket-73219.herokuapp.com/api/v1/messages/:id' - Gets a single message by the id

DELETE 'https://radiant-thicket-73219.herokuapp.com/api/v1/messages/:id' - Deletes a single message by the id

## Author

Nnaemeka Valentine Eziamaka