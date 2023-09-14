const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 4005;

app.use(bodyParser.json());

let eventCount = 0;

app.post("/events", (req, res) => {
  const event = req.body;

  eventCount++;
  console.log("Received Event request number: " + eventCount);

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});


// Server Configuration
app.listen(PORT, () => {
  console.log(`EVENT-BUS Listening on PORT: ${PORT}`);
});
