import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = ( { postStatus } ) => {
  const [posts, setPosts] = useState({});

  const [commentCreated, setCommentCreated] = useState(false);

  // Function to toggle commentCreated state variable to trigger the useEffect
  const handleCommentCreated = () => setCommentCreated(!commentCreated);

  const fetchPosts = async () => {
    const res = await axios.get("http://k8.posts.com/posts");

    setPosts(res.data);
  };

  useEffect(() => {

    fetchPosts();

  }, [ commentCreated, postStatus ]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          { post.comments && <CommentList comments={post.comments}/> }
          <CommentCreate postId={post.id} handleCommentCreated={handleCommentCreated}/>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
