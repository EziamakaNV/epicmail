/* eslint-disable linebreak-style */
import express from 'express';

import ViewController from '../controller/View';

import Authentication from '../middleware/auth';

const router = express.Router();

router.get('/login', ViewController.login);

router.get('/signup', ViewController.signup);

router.get('/inbox', Authentication.verifyToken, ViewController.inbox);

router.get('/sent', Authentication.verifyToken, ViewController.sent);

router.get('/newmessage', Authentication.verifyToken, ViewController.newmessage);

export default router; // Export group router
