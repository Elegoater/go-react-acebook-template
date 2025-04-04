import { createPost } from '../../services/posts'; // Adjust the path if necessary

const CreatePost = ({ content, setContent }) => {
  const handleQuestionChange = (event) => {
    const question = event.target.value;
    setContent((prevContent) => ({ ...prevContent, question }));
  };

  const handleAnswerChange = (event) => {
    const answer = event.target.value;
    setContent((prevContent) => ({ ...prevContent, answer }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return; // Handle the case where token is not available
    try {
      await createPost(token, content.question, content.answer); // Pass question and answer separately
      console.log("Post created successfully");
      setContent({ question: '', answer: '' }); // Reset the form
      window.location.reload();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        id="question"
        type="text"
        value={content.question || ''}
        onChange={handleQuestionChange}
        placeholder="Enter your question"
      />
      <input
        id="answer"
        type="text"
        value={content.answer || ''}
        onChange={handleAnswerChange}
        placeholder="Enter your answer"
      />
      <input role="submit-button" id="submit" type="submit" value="Submit" />
    </form>
  );
};

export default CreatePost;