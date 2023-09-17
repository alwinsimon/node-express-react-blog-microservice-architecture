// * ================================================== POST SERVICE ==================================================

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require ('cors');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4000;

const posts = {};

// Route to get all posts
app.get('/posts/create', (req, res) => {
  res.send(posts);
});

// Route to add new post
app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  // Publishing Event To Event-Bus
  const eventData = {
    type: "PostCreated",
    data: { id, title }
  };

  await axios.post('http://event-bus-srv:4005/events', eventData).catch((err) => {
    console.log(err.message);
  });

  res.status(201).send(posts[id]);
});


// Responding to Event-Bus
app.post('/events', (req, res) => {

  console.log("POSTS Service Received Event: ", req.body.type);

  res.status(200).send({ message: 'Received Event'});
});


// Server Configuration
app.listen(PORT, () => {
  console.log(`POST SERVICE Listening on PORT: ${PORT}`);
});
