const express = require('express');
const posts = require('./posts/postDb')

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
  .then(post => {
    res.status(200).json({ data: post })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured retrieving the posts" })
  })
});

router.get('/:id', validatePostId, (req, res) => {
  const id = Number(req.params.id)
  
  posts.getById(id)
  .then(post => {
    res.status(200).json({ data: post })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured retrieving the post" })
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  const id = Number(req.params.id)

  posts.remove(id)
  .then(postNum => {
    res.status(204).json({ data: `Removed ${postNum} post(s)` })
  })
});

router.put('/:id', validatePost, validatePostId, (req, res) => {
  const id = Number(req.params.id)

  posts.update(id, req.body)
  .then(post => {
    posts.getById(id)
    .then(newPost => {
      res.status(200).json({ data: newPost })
    })
    .catch(err => {
      res.status(500).json({ error: err, errorMessage: "An error occured updating the post" })
    })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured updating the post" })
  })
});

// custom middleware

function validatePost(req, res, next) {
  const { text } = req.body

  if(!req.body){
    res.status(400).json({ message: "missing post data" })
  } else if(!text){
    res.status(400).json({ message: "missing required text field" })
  } else if(req.body && text){
    next()
  } else{
    res.status(500).json({ error: err, errorMessage: errMessage })
  }
}

function validatePostId(req, res, next) {
  const id = Number(req.params.id)

  posts.getById(id)
  .then(post => {
    if(post){
      req.post = post
      next()
    } else{
      res.status(400).json({ message: "invalid post id" })
    }
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: errMessage })
  })
}

const errMessage = "A validation error has occured"

module.exports = router;
