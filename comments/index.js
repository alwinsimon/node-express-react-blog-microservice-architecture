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

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  // Publishing Event To Event-Bus
  const eventData = {
    type: "CommentCreated",
    data: { 
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  };

  await axios.post('http://event-bus-srv:4005/events', eventData).catch((err) => {
    console.log(err.message);
  });

  res.status(201).send(comments);
});

// Responding to Event-Bus
app.post('/events', async (req, res) => {

  console.log("COMMENTS Service Received Event: ", req.body.type);

  const { type, data } = req.body;

  if( type === 'CommentModerated' ) {
    const { postId, id, status, content } = data;

    const commentsOfGivenPost = commentsByPostId[postId];

    const commentToUpdate = commentsOfGivenPost.find((comment) => {
      return comment.id === id;
    });

    commentToUpdate.status = status;

    // Publishing Event To Event-Bus
    const eventData = {
      type: "CommentUpdated",
      data: {
        id: id,
        status: status,
        postId: postId,
        content: content
      },
    };

    await axios.post("http://event-bus-srv:4005/events", eventData).catch((err) => {
      console.log(err.message);
    });
  }

  res.status(200).send({ message: 'Received Event'});
});

// Server Configuration
app.listen(PORT, () => {
  console.log(`COMMENTS SERVICE Listening on PORT: ${PORT}`);
});
