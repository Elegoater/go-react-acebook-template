import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInHeader from "../../components/Post/LoggedInHeader";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost/";
import Modal from "../../components/Modal/Modal";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState({ question: "", answer: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    getPosts(token)
      .then((data) => {
        setPosts(data.posts);
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home">
      <LoggedInHeader onLogout={logOutHandler} />
      <h2>Posts</h2>
      <button onClick={openModal} className="new-post-button">Make a New Post</button>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <CreatePost content={content} setContent={setContent} />
        </Modal>
      )}
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};
