const express = require('express');
const router = express.Router();

const Article = require('../models/article');

router.get('/articles', async (req, res, next) => {
  const articles = await Article.findAll()
  res.json(articles)
})

router.get('/articles/:id', async (req, res, next) => {
  const id = req.params.id
  const article = await Article.findById(id)
  if (!article) {
    res.sendStatus(404)
  } else {
    res.json(article)
  }
})

router.post('/articles', async (req, res, next) => {
  try {
    const article = await Article.create(req.body)
    res.status(200).json({
      message: 'Created successfully',
      article
    })
  } catch (err) {
    res.sendStatus(500)
  }
})

router.put('/articles/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const article = await Article.findById(id)
    if (!article) return res.sendStatus(404)
    const updated = await article.update(req.body)
    res.json({
      article: updated,
      message: 'Updated successfully'
    })
  } catch (err) {
    res.sendStatus(500)
  }
})

module.exports = router;
