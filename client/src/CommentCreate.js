import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId, handleCommentCreated }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if(content === '') return;

    await axios.post(`http://k8.posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
    
    // Wait for 1 second to allow the moderation service to process the comment
    setTimeout(() => {
      handleCommentCreated();
    }, 100);

  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
