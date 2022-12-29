import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/slams">
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
            </ul>
            {!localStorage.getItem("authToken") ? (
              <form className="d-flex">
                <button
                  className="btn btn-danger rounded my-2 my-sm-0"
                  type="button"
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  {props.btn1}
                </button>
                <button
                  className="btn btn-secondary rounded my-2 mx-2 my-sm-0"
                  type="button"
                  onClick={() => {
                    navigate("/signIn");
                  }}
                >
                  {props.btn2}
                </button>
              </form>
            ) : (
              <button
                className="btn btn-danger rounded my-2 mx-2 my-sm-0"
                type="button"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                {props.btn3}
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
  navItem: "Slams",
  navItem2: "About",
  navItem3: "Contact",
  btn1: "Sign Up",
  btn2: "Sign In",
  btn3: "Logout",
};

export default Navbar;
