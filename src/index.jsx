import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Authors from "./pages/Authors.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import CategoryPosts from "./pages/CategoryPosts.jsx";
import AuthorPosts from "./pages/AuthorPosts.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DeletePost from "./pages/DeletePost.jsx";
import UserProvider from "./context/userContext.jsx";
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
