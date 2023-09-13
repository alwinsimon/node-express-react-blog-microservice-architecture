// * ================================================== POST SERVICE ==================================================

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require ('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4000;

const posts = {};

// Route to get all posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Route to add new post
app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  res.status(201).send(posts[id]);
});



// Server Configuration
app.listen(PORT, () => {
  console.log(`POST SERVICE Listening on PORT: ${PORT}`);
});
