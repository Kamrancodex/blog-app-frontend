import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function UserProfile() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const navigate = useNavigate();
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `https://blog-app-backend-d194.onrender.com/api/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    };
    getUser();
  }, []);
  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `https://blog-app-backend-d194.onrender.com/api/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("newConfirmPassword", newConfirmPassword);
      const response = await axios.patch(
        "https://blog-app-backend-d194.onrender.com/api/users/edit-user",
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.status == 200) {
        navigate("/logout");
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          My Posts
        </Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img
                src={`https://blog-app-backend-d194.onrender.com/uploads/${avatar}`}
                alt=""
              />
            </div>
            <form className="avatar_form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png,jpg,jpeg"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <LiaUserEditSolid />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile_avatar-btn"
                onClick={changeAvatarHandler}
              >
                <IoMdCheckmarkCircleOutline />
              </button>
            )}
          </div>
        </div>
        <h1>{currentUser.name}</h1>
        <form className="form profile_form" onSubmit={updateUserDetails}>
          {error && <p className="form_error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={newConfirmPassword}
            onChange={(e) => setNewConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}

export default UserProfile;
