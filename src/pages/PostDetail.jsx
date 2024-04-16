import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://blog-app-backend-d194.onrender.com/api/posts/" + id
        );
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post_detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post_detail-container">
          <div className="post_detail-header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {(currentUser ? currentUser.id : undefined) ==
              (post ? post.creator : undefined) && (
              <div className="post_detail-buttons">
                <Link
                  to={`/post/${post._id}/edit`}
                  className="btn sm btn-primary"
                >
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post_detail-thumbnail">
            <img
              src={
                "https://blog-app-backend-d194.onrender.com/uploads/" +
                post.thumbnail
              }
              alt=""
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
}

export default PostDetail;
