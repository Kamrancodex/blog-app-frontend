import React, { useEffect, useState, useContext } from "react";
import { DUMY_POSTS } from "../data";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://blog-app-backend-d194.onrender.com/api/posts/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPost();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  console.log(posts);
  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard_container">
          {posts.map((posts) => {
            return (
              <article key={posts.id} className="dashboard_post">
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img
                      src={`https://blog-app-backend-d194.onrender.com/uploads/${posts.thumbnail}`}
                      alt={posts.name}
                    />
                  </div>
                  <h5>{posts.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${posts._id}`} className="btn sm">
                    View
                  </Link>
                  <Link
                    to={`/post/${posts._id}/edit`}
                    className="btn sm btn-primary"
                  >
                    Edit
                  </Link>
                  <DeletePost postId={posts._id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No Posts Yet</h2>
      )}
    </section>
  );
}

export default Dashboard;
