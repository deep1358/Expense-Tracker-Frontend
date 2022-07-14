import React from "react";
import { Link } from "react-router-dom";
import "./css.css";

const Breadcrumb = ({ items = [] }) => {
  return (
    <div id="crumbs">
      <h1>Breadcrumbs</h1>
      <ul>
        <li>
          <Link to="#1">Home</Link>
        </li>
        <li>
          <Link to="#2">Home</Link>
        </li>
        <li>
          <Link to="#3">Home</Link>
        </li>
        <li>
          <Link to="#4">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
