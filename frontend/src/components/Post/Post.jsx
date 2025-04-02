const Post = (props) => {
  return <article key={props.post._id}>{props.post.question}, {props.post.answer}, by userID {props.post.user_id}</article>;
};

export default Post;
