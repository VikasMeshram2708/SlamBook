import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  {props.navItem}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {props.navItem2}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  {props.navItem3}
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                {props.navItem4}
              </button>
              <button className="btn btn-danger mx-2 my-2 my-sm-0" type="submit">
                {props.navItem5}
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.defaultProps = {
  title: "SlamBook",
  navItem: "Profile",
  navItem2: "About",
  navItem3: "Contact",
  navItem4: "Sign Up",
  navItem5: "Sign In",
};

export default Navbar;
