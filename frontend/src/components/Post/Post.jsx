import { useState } from "react";
import "./Post.css";

const Post = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswerVisibility = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <article className="post-box">
      <div className="post-user-id">User ID: {props.post.user_id}</div>
      <div className="post-content">
        <p className="post-question"><strong>Question:</strong> {props.post.question}</p>
        {showAnswer ? (
          <p className="post-answer"><strong>Answer:</strong> {props.post.answer}</p>
        ) : (
          <button className="reveal-answer-button" onClick={toggleAnswerVisibility}>
            Show Answer
          </button>
        )}
      </div>
    </article>
  );
};

export default Post;
