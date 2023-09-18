import React, { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {

  const [postCreated, setPostCreated] = useState(false);

  const handlePostCreation = () => { setPostCreated( !postCreated ) };


  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate changePostStatus={handlePostCreation}/>
      <hr />
      <PostList postStatus={postCreated}/>
    </div>
  );

};


export default App;