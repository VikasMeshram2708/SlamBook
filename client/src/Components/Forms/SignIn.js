import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [invalidEmailSuccess, setInvalidEmailSuccess] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [invalidKey, setInvalidKey] = useState(false);
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
        setEmail("");
        setPassword("");
        setSuccess(true);
        localStorage.setItem("authToken", token);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
      if (response.status === 422) {
        setInvalidEmailSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        // alert("");
      }
      if (response.status === 404) {
        setInvalidKey(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      if (response.status === 500) {
        setInternalError(true);
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
      {success ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>User Logged In Successfully...</strong>
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
      {invalidEmailSuccess ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Try to login with valid Credentials or password</strong>
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
      {invalidKey ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>
            Try to register with valid Credentials invalid key provided...
          </strong>
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
      {internalError ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Some Internal Server Error</strong>
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
