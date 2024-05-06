const express = require('express');
const router = express.Router();
const connection = require('../lib/conn.js');
const { randomUUID } = require('crypto');

/* POST create new document */
router.post('/new', (req, res) => {
  const user = req.body.userId;
  const docTitle = req.body.docTitle;
  const docText = req.body.docText;
  const UUID = randomUUID();

  if (!docText || !docTitle) {
    return res
      .status(400)
      .json({ error: 'You need a text and title to save!' });
  }

  connection.connect((err) => {
    if (err) {
      console.log('err', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    const query =
      'INSERT into docs (docTitle, docText, userId, UUID) VALUES (?, ?, ?, ?)';
    const values = [docTitle, docText, user, UUID];

    connection.query(query, values, (err, data) => {
      if (err) {
        console.log('err', err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
          res.status(400).json({ message: 'No such user in database!' });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
        return;
      }

      console.log('doc:', data);
      res.json({ message: 'Document saved!', docId: UUID });
    });
  });
});

/* GET all docs from user */
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  const query =
    'SELECT docTitle, SUBSTRING(docText, 1, 200) AS docTextShort, UUID FROM docs WHERE userId = ? AND deleted = 0';
  const values = [userId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.log('err', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json(data);
  });
});

/* DELETE soft delete one document */
router.delete('/delete/:id', (req, res) => {
  const objectId = req.params.id;

  const query = 'UPDATE docs SET deleted = 1 WHERE UUID = ?';
  const values = [objectId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.log('err', err);
      res.status(500).json({ message: 'Error while deleting' });
      return;
    }

    if (data.affectedRows === 0) {
      res.status(404).json({ message: 'Document was not found!' });
    } else {
      res.json({ message: 'Document was deleted successfully!' });
    }
  });
});

/* GET single document from user */
router.get('/:userId/:documentId', (req, res) => {
  const userId = req.params.userId;
  const documentId = req.params.documentId;

  const query =
    'SELECT * FROM docs WHERE userId = ? AND UUID = ? AND deleted = 0';
  const values = [userId, documentId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.log('err', err);
      res.status(500).json({ message: 'Couldnt get the document' });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: 'Document not found or deleted' });
    } else {
      res.json(data[0]);
    }
  });
});

/* PUT save changes made to file */
router.put('/:documentId', (req, res) => {
  const documentId = req.params.documentId;
  const docTitle = req.body.docTitle;
  const docText = req.body.docText;

  const query = 'UPDATE docs SET docTitle = ?, docText = ? WHERE UUID = ?';
  const values = [docTitle, docText, documentId];

  connection.query(query, values, (err, data) => {
    if (err) {
      console.log('err', err);
      res.status(500).json({ message: 'Failed to update the document!' });
      return;
    }

    if (data.affectedRows === 0) {
      res.status(404).json({ message: 'Document not found!' });
    } else {
      res.json({ message: 'Document updated successfully' });
    }
  });
});

module.exports = router;
