const express = require('express');

const controller = require('../controller/articleController');

const router = express.Router();

router.get('/', controller.getAllArticles);

router.get('/:id', controller.getArticleByID);

router.post('/', controller.postArticle);

router.put('/:id', controller.putArticle);

router.patch('/:id', controller.patchArticle);

router.delete('/:id', controller.deleteArticle);

module.exports = router;