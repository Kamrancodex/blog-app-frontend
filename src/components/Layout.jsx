import React from "react";
import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
}

export default Layout;
