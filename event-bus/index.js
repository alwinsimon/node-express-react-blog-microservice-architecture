const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 4005;

app.use(bodyParser.json());

let eventCount = 0;

const eventBrokerStorage = [];

app.post("/events", (req, res) => {

  const event = req.body;
  eventBrokerStorage.push(event);

  eventCount++;
  console.log(`Received Event request number: ${eventCount} with Event Type: ${event.type}`);

  // Emitting Events to different services
  axios.post("http://posts-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.status(200).send(eventBrokerStorage);
});


// Server Configuration
app.listen(PORT, () => {
  console.log(`EVENT-BUS Listening on PORT: ${PORT}`);
});
