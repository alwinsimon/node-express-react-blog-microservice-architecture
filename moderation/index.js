const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const PORT = 4003;

app.use(bodyParser.json());


app.post('/events', (req, res) => {

    console.log("MODERATION Service Received Event: ", req.body.type);
    
    const { type, data } = req.body;

    if(type === 'CommentCreated') {
        const status = data.content.includes('danger') ? 'rejected' : 'approved';

        const eventData = { 
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status: status,
                content: data.content
            }
        };

        axios.post('http://event-bus-srv:4005/events', eventData);
    }
    res.status(200).send({status: 'success'});
});



// Server Configuration
app.listen(PORT, () => {
    console.log(`MODERATION SERVICE Listening on PORT: ${PORT}`);
});
