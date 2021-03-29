const express = require('express');

const controller = require('../controller/authorController');

const router = express.Router();

router.get('/', controller.getAllAuthors);

router.get('/:id', controller.getAuthorByID);

router.post('/', controller.postAuthor);

router.put('/:id', controller.putAuthor);

router.delete('/:id', controller.deleteAuthor);

module.exports = router;