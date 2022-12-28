import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
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
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    {props.navItem}
                  </Link>
                </li>
              ) : (
                ""
              )}
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
            {!localStorage.getItem("authToken") ? (
              <form className="d-flex">
                <button
                  onClick={() => navigate("/signUp")}
                  className="btn btn-primary my-2 my-sm-0"
                  type="button"
                >
                  {props.navItem4}
                </button>
                <button
                  onClick={() => navigate("/signIn")}
                  className="btn btn-danger mx-2 my-2 my-sm-0"
                  type="button"
                >
                  {props.navItem5}
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="btn btn-danger mx-2 my-2 my-sm-0"
                type="button"
              >
                {props.navItem6}
              </button>
            )}
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
  navItem6: "Logout",
};

export default Navbar;
