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
        
        posts[id] = { id, title, comments: [] };

        console.log("QUERY Service: Post Created");

        res.status(201).send({ status: 'Post Created'});
    }

    if ( type === 'CommentCreated' ){
        
        const { id, content, postId, status } = data;

        const postToUpdate = posts[postId];

        postToUpdate.comments.push({ id, content, status });

        console.log("QUERY Service: Comment Created");

        res.status(201).send({ status: 'Comment Added'});
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

        res.status(201).send({ status: 'Comment Updated'});
    }

});






// Server Configuration
app.listen(PORT, () => {
    console.log(`QUERY SERVICE Listening on PORT: ${PORT}`);
});