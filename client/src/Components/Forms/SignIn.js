import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiURI = "/api/auth/userLogin";
  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault();
      const data = {
        email,
        password,
      };
      console.log(data);
      const response = await fetch(apiURI, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      const { token } = json;
      if (response.status === 201) {
        alert("User Logged Successfully...");
        navigate("/profile");
        setEmail("");
        setPassword("");
        localStorage.setItem("authToken", token);
      }
      if (response.status === 403) {
        alert("Hey, try to register with valid credentails...");
      }
      if (response.status === 404) {
        alert("Try to register with valid Credentials invalid key provided...");
      }
      if (response.status === 500) {
        alert("Some Internal Server Error");
      }
    },
    // eslint-disable-next-line
    [email, password]
  );

  return (
    <>
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
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign In
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignIn;
