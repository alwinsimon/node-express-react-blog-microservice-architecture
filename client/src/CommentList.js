import React from "react";

const CommentList = ({ comments }) => {
  
  const renderedComments = comments.map((comment) => {
    let content;
    let className;

    if(comment.status === 'approved') {
      content = comment.content;
      className = 'list-group-item-success';
    }
    if(comment.status === 'rejected') {
      content = 'This comment has been rejected.';
      className = 'list-group-item-danger';
    }
    if(comment.status === 'pending') {
      content = 'This comment is awaiting moderation.';
      className = 'list-group-item-warning';
    }
    
    return <li key={comment.id} className={className}>{content}</li>;
  });

  return <ul className="list-group">{renderedComments}</ul>;
};

export default CommentList;
