import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/users`);
        setAuthors(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getAuthors();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="authors">
      <div className="container authors_container">
        {authors.map(({ _id: id, avatar, name, posts }) => {
          return (
            <Link key={id} to={`/posts/users/${id}`} className="author">
              <div className="author_avatar">
                <img
                  src={`http://localhost:3000/uploads/${avatar}`}
                  alt={`image of ${name}`}
                />
              </div>
              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Authors;
