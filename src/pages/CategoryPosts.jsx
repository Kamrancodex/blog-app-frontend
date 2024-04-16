import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";

function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://blog-app-backend-d194.onrender.com/api/posts/categories/" +
            category
        );

        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [category]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="posts">
      <div className="container posts_container">
        {posts.map(
          ({
            _id: id,
            thumbnail,
            category,
            title,
            description,
            creator,
            createdAt,
          }) => (
            <PostItem
              key={id}
              postId={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
              createdAt={createdAt}
            />
          )
        )}
      </div>
    </section>
  );
}

export default CategoryPosts;
