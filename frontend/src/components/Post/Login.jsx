import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  return (
    <div className="login">
      <header className="login-details">
        <h1 className="login-title">Login</h1>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Email"
          id="email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <p className="signup-text">
        Don't have an account?{" "}
        <Link className="loginButton" to="/signup">
          Sign Up Here
        </Link>
      </p>
    </div>
  );
};

export default Login;
