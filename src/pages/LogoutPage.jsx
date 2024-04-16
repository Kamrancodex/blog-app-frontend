import React, { useContext, useEffect } from "react";
import { Fragment } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
function LogoutPage() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  setCurrentUser(null);
  navigate("/login");
  return <Fragment></Fragment>;
}

export default LogoutPage;
