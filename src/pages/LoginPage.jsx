import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  function changeInputHandler(e) {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }
  async function loginUser(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        userData
      );
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (err) {
      setError(err.response.data.msg);
    }
  }
  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login_form" onSubmit={loginUser}>
          {error && <p className="form_error-message">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        <small>
          Dont have an account? <Link to="/register">Sign Up</Link>
        </small>
      </div>
    </section>
  );
}

export default LoginPage;
