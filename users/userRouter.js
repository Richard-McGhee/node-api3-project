const express = require('express');
const users = require('./users/userDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
  .then(user => {
    res.status(201).json({ data: user })
  })
  .catch(err => {
    res.status(500).json({ error: err, errorMessage: "An error occured creating the post" })
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
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
      res.status(500).json({ error: err, errorMessage: "A validation error has occured" })
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
    res.status(500).json({ error: err, errorMessage: "A validation error has occured" })
  }
}

module.exports = router;
