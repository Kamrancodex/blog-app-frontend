import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./src/components/Layout.jsx";
import Home from "./src/pages/Home.jsx";
import ErrorPage from "./src/pages/ErrorPage.jsx";
import PostDetail from "./src/pages/PostDetail.jsx";
import LoginPage from "./src/pages/LoginPage.jsx";
import UserProfile from "./src/pages/UserProfile.jsx";
import Authors from "./src/pages/Authors.jsx";
import CreatePost from "./src/pages/CreatePost.jsx";
import EditPost from "./src/pages/EditPost.jsx";
import LogoutPage from "./src/pages/LogoutPage.jsx";
import CategoryPosts from "./src/pages/CategoryPosts.jsx";
import AuthorPosts from "./src/pages/AuthorPosts.jsx";
import Register from "./src/pages/Register.jsx";
import Dashboard from "./src/pages/Dashboard.jsx";
import DeletePost from "./src/pages/DeletePost.jsx";
import UserProvider from "./src/context/userContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "posts/:id",
        element: <PostDetail />,
      },
      {
        path: "posts/users/:id",
        element: <AuthorPosts />,
      },

      { path: "register", element: <Register /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile/:id",
        element: <UserProfile />,
      },
      {
        path: "/myposts/:id",
        element: <Dashboard />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "create",
        element: <CreatePost />,
      },
      {
        path: "post/:id/edit",
        element: <EditPost />,
      },
      {
        path: "post/:id/delete",
        element: <DeletePost />,
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
      {
        path: "posts/categories/:category",
        element: <CategoryPosts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
