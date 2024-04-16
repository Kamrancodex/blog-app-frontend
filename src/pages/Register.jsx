import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function changeInputHandler(e) {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }
  async function registerUser(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://blog-app-backend-d194.onrender.com/api/users/register`,
        userData
      );
      console.log("response", response);
      const newUser = response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again ");
      }
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg || "An unexpected error occurred.";

      setError(errorMessage);
    }
  }
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form" onSubmit={registerUser}>
          {error && <p className="form_error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </section>
  );
}

export default Register;
