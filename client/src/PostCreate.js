import React, { useState } from "react";
import axios from "axios";

const PostCreate = ( { changePostStatus } ) => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if(title === '') return; 

    await axios.post("http://k8.posts.com/posts/create", {
      title
    });

    setTitle("");

    changePostStatus();

  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
