const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require ('cors');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4001;

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  // Publishing Event To Event-Bus
  const eventData = {
    type: "CommentCreated",
    data: { 
      id: commentId,
      content,
      postId: req.params.id
    }
  };

  await axios.post('http://localhost:4005/events', eventData).catch((err) => {
    console.log(err.message);
  });

  res.status(201).send(comments);
});

// Responding to Event-Bus
app.post('/events', (req, res) => {

  console.log("Received Event: ", req.body.type);

  res.status(200).send({ message: 'Received Event'});
});

// Server Configuration
app.listen(PORT, () => {
  console.log(`COMMENTS SERVICE Listening on PORT: ${PORT}`);
});
