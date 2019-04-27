/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable quotes */
class ViewController {
  static login(req, res) {
    res.sendFile('/UI/Signin.html', { root: process.cwd() });
  }

  static signup(req, res) {
    res.sendFile('/UI/Signup.html', { root: process.cwd() });
  }

  static inbox(req, res) {
    res.sendFile('/UI/Inbox.html', { root: process.cwd() });
  }

  static sent(req, res) {
    res.sendFile('/UI/Sent.html', { root: process.cwd() });
  }

  static newmessage(req, res) {
    res.sendFile('UI/Newmessage.html', { root: process.cwd() });
  }
}

export default ViewController;
