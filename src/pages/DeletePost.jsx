import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { UserContext } from "../context/userContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
function DeletePost({ postId: id }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://blog-app-backend-d194.onrender.com/api/posts/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Couldnt delete the post");
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Link className="btn sm danger" onClick={() => removePost(id)}>
      Delete
    </Link>
  );
}

export default DeletePost;
