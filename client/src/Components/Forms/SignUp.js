import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [alreadyRegisterdSuccess, setAlreadyRegisterdSuccess] = useState(false);
  const [bothSuccess, setBothSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const apiURI = "/api/auth/createUser";
  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault();
      const data = {
        name,
        email,
        password,
        phone,
        dob,
      };
      // console.log(data);
      const response = await fetch(apiURI, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      if (response.status === 201) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setDob("");
        setTimeout(() => {
          navigate("/signIn");
        }, 3000);
      }
      if (response.status === 403) {
        setAlreadyRegisterdSuccess(true);
        // after 3 seconds reload the window
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      if (response.status === 422) {
        alert("Try to register with valid Credentials...");
      }
      if (response.status === 500) {
        setBothSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    },
    // eslint-disable-next-line
    [name, email, password, phone, dob]
  );

  return (
    <>
      {success ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>User Registerd Successfully...</strong>
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
      {alreadyRegisterdSuccess ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>
            Hey, try to register with valid credentails email already
            registerd...
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
      {bothSuccess ? (
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
        <h3 className="form-label">Sign Up</h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="name"
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
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
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="phone"
            size="30"
            maxLength="99"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            placeholder="mobile no...."
          />
          <label htmlFor="floatingInput">Phone</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="dob"
            value={dob}
            onChange={(event) => {
              setDob(event.target.value);
            }}
            placeholder="Date of Birth"
          />
          <label htmlFor="floatingInput">Date of Birth</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <Link to="/signIn">Already a User</Link>
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
        <hr className="my-4" />
        <small className="text-muted">
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignUp;
