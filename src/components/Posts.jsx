import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Loader from "./Loader";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/posts");

        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);
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

export default Posts;
