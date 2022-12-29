import React, { useState, useCallback } from "react";

import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const Msg201 = "User Logged In Successfully...";
  const Msg404 =
    "Hey, try to login with valid credentails invalid key provided";
  const Msg422 =
    "Try to login with valid Credentials invalid Email provided...";

  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault();
      const data = {
        email,
        password,
      };
      // console.log(data);
      const response = await fetch("/api/auth/userLogin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json.token);
      if (response.status === 201) {
        setSuccessMsg(true);
        setErrorMsg(Msg201);
        localStorage.setItem("authToken", json.token);
        setTimeout(() => {
          navigate("/slams");
          window.location.reload();
        }, 3000);
      }
      if (response.status === 404) {
        setSuccessMsg(true);
        setErrorMsg(Msg404);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      if (response.status === 422) {
        setSuccessMsg(true);
        setErrorMsg(Msg422);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    },
    // eslint-disable-next-line
    [email, password]
  );

  return (
    <>
      {successMsg ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>{errorMsg}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}
      <form
        onSubmit={formSubmitted}
        className="p-4 p-md-5 border rounded-3 bg-light container mt-5"
      >
        <h3 className="form-label">Sign In</h3>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <Link to="/signUp">New User</Link>
          </label>
        </div>
        <button className="w-100 rounded fs-5 btn btn-primary" type="submit">
          Sign In
        </button>
        <hr className="my-4" />
      </form>
    </>
  );
};

export default SignIn;
