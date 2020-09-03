const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
  .then(user => {
    res.status(201).json({ data: user })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured creating the user" })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = Number(req.params.id)

  users.getUserPosts(id)
  .then(userPosts => {
    posts.insert(req.body)
    .then(newPost => {
      res.status(201).json({ data: newPost })
    })
    .catch(err => {
      res.status(500).json({ error: err, errorMessage: "An error occured creating the post" })
    })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "A different error occured" })
  })

  // posts.insert(req.body)
  // .then(newPost => {
  //   res.status(201).json({ data: newPost })
  // })
  // .catch(err => {
  //   res.status(500).json({ error: err, errorMessage: "An error occured creating the post" })
  // })
});

router.get('/', (req, res) => {
  users.get()
  .then(user => {
    res.status(200).json({ data: user})
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured retrieving the users" })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  const id = Number(req.params.id)

  users.getById(id)
  .then(user => {
    res.status(200).json({ data: user })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured retrieving the user" })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const id = Number(req.params.id)

  users.getUserPosts(id)
  .then(post => {
    res.status(200).json({ data: post })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured retrieving the post" })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = Number(req.params.id)

  users.remove(id)
  .then(userNum => {
    res.status(200).json({ data: `Removed ${userNum} post(s)` })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured deleting the user" })
  })
});

router.put('/:id',validateUser, validateUserId, (req, res) => {
  const id = Number(req.params.id)

  users.update(id, req.body)
  .then(user => {
    users.getById(id)
    .then(newUser => {
      res.status(200).json({ data: newUser })
    })
    .catch(err => {
      res.status(500).json({ error: err, errorMessage: "An error occured updating the user" })
    })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured updating the user" })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = Number(req.params.id)

  users.getById(id)
  .then(user => {
    if(user){
      req.user = user
      next()
    } else{
      res.status(400).json({ message: "invalid user id" })
    }
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: errMessage })
  })
}

function validateUser(req, res, next) {
  const { name } = req.body

    if(!req.body){
      res.status(400).json({ message: "missing user data" })
    } else if(!name){
      res.status(400).json({ message: "missing required name field" })
    } else if(req.body && name){
      next()
    } else{
      res.status(500).json({ error: err, errorMessage: errMessage })
    }
}

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

const errMessage = "A validation error has occured"

module.exports = router;
