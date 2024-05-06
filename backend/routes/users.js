const express = require('express');
const router = express.Router();
const connection = require('../lib/conn.js');
const { randomUUID } = require('crypto');
const CryptoJS = require('crypto-js');

/* POST new user */
router.post('/', (req, res) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const inputPassword = req.body.password;

  if (!userName || !userEmail || !inputPassword) {
    return res.status(400).json({ error: 'All fields needs to be filled in!' });
  }

  const password = CryptoJS.AES.encrypt(
    inputPassword,
    process.env.SALT_KEY
  ).toString();
  const UUID = randomUUID();

  connection.connect((err) => {
    if (err) console.log('err', err);

    const query =
      'INSERT into users (userName, userEmail, password, UUID) VALUES (?, ?, ?, ?)';
    const values = [userName, userEmail, password, UUID];

    connection.query(query, values, (err, data) => {
      if (err) console.log('err', err);

      console.log('users:', data);
      res.json({ message: 'User saved', user: UUID });
    });
  });
});

/* POST log in user */
router.post('/login', (req, res) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  try {
    connection.connect((err) => {
      if (err) console.log('err', err);

      const query = 'SELECT password, UUID FROM users WHERE userEmail = ?';
      const values = [emailInput];

      connection.query(query, values, (err, data) => {
        if (err) {
          console.log('err', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }

        if (data.length > 0) {
          const user = data[0];
          const originalPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SALT_KEY
          ).toString(CryptoJS.enc.Utf8);

          if (originalPassword === passwordInput) {
            res.json({ user: user.UUID });
          } else {
            res.status(401).json({ message: 'Invalid username or password!' });
          }
        } else {
          res.status(401).json({ message: 'Invalid username or password!' });
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/* GET username from id */
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT userName FROM users WHERE UUID = ?';
  const values = [userId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.log('err', err);
      res.status(500).json({ message: 'Couldnt get the user' });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: 'User not found or deleted' });
    } else {
      res.json(data[0].userName);
    }
  });
});

module.exports = router;
