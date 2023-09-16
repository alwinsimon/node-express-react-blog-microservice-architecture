const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();

const PORT = 4002;

app.use(cors());
app.use(bodyParser.json());

// DS to store the Data
const posts = {};

// Event Handler Function
const handleEvent = ( type, data ) => {

    if ( type === 'PostCreated' ){

        const { id, title } = data;
        
        posts[id] = { id, title, comments: [] };

        console.log("QUERY Service: Post Created");

    }

    if ( type === 'CommentCreated' ){
        
        const { id, content, postId, status } = data;

        const postToUpdate = posts[postId];

        postToUpdate.comments.push({ id, content, status });

        console.log("QUERY Service: Comment Created");

    }

    if ( type === 'CommentUpdated' ){
        
        const { id, content, postId, status } = data;

        const postToUpdate = posts[postId];

        const commentToUpdate = postToUpdate.comments.find((comment) =>{
            return comment.id === id;
        });

        commentToUpdate.status = status;
        commentToUpdate.content = content;

        console.log(`Comment Id: ${id} of Post Id ${postId} Updated`);

    }
};


app.get('/posts', (req, res) =>{

    res.status(201).send(posts);

});

app.post('/events', (req, res) =>{
    
    const { type, data } = req.body;

    handleEvent(type, data);

    res.status(201).send(`Processed ${type} event`);

});






// Server Configuration
app.listen(PORT, async () => {
    console.log(`QUERY SERVICE Listening on PORT: ${PORT}`);

    // Updating the server with the latest data from Event Broker
    try {

        const res = await axios.get("http://event-bus-srv:4005/events").catch((err) => {
            console.log(err.message);
        });

        for (const event of res.data) {
            console.log(`Processing Event : ${event.type}`);
            handleEvent(event.type, event.data);
        }

    } catch (err) {

        console.log(err.message);

    }
    

});