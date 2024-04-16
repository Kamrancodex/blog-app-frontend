import React from "react";
import PostAuthor from "./PostAuthor";
import { Link } from "react-router-dom";
function PostItem({
  postId,
  category,
  title,
  description,
  authorID,
  thumbnail,
  createdAt,
}) {
  const shortDescription =
    description.length > 145 ? description.substr(0, 145) + "..." : description;
  const shortTitle = title.length > 35 ? title.substr(0, 35) + "..." : title;
  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={"http://localhost:3000/uploads/" + thumbnail} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${postId}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
        <div className="post_footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <Link
            to={`/posts/categories/${category}`}
            className="btn btn-category"
          >
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostItem;
