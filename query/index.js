const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const PORT = 4002;

app.use(cors());
app.use(bodyParser.json());

// DS to store the Data
const posts = {};



app.get('/posts', (req, res) =>{

    res.status(201).send(posts);

});

app.post('/events', (req, res) =>{
    
    const { type, data } = req.body;

    if ( type === 'PostCreated' ){

        const { id, title } = data;
        
        posts[id] = { id, title, Comments: [] };

        console.log(posts[id]);

        res.status(201).send({ status: 'Post Created'});
    }

    if ( type === 'CommentCreated' ){
        
        const { id, content, postId } = data;

        posts[postId].Comments.push({ id, content });

        console.log(posts[postId]);

        res.status(201).send({ status: 'Comment Added'});
    }

});










// Server Configuration
app.listen(PORT, () => {
    console.log(`QUERY SERVICE Listening on PORT: ${PORT}`);
});