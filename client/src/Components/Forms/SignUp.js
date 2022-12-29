import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const msg500 =
    "Some Internal Server error try to register with valid credentials....";
  const msg403 =
    "Hey, try to register with valid credentails email already registerd...";

  const msg422 = "Hey, try to login with valid Credentials";

  const msg201 = "User Registered Successfully";

  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault();
      setSuccessMsg(true);
      const data = {
        name,
        email,
        password,
        phone,
        dob,
      };
      // console.log(data);
      const response = await fetch("/api/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);
      if (response.status === 201) {
        setSuccessMsg(true);
        setErrorMsg(msg201);
        setTimeout(() => {
          navigate("/signIn");
          // window.location.reload();
        }, 3000);
      }
      if (response.status === 500) {
        setSuccessMsg(true);
        setErrorMsg(msg500);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      if (response.status === 403) {
        setSuccessMsg(true);
        setErrorMsg(msg403);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      if (response.status === 422) {
        setSuccessMsg(true);
        setErrorMsg(msg422);
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
        <h3 className="form-label">Sign Up</h3>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            minLength="2"
            maxLength="30"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="name"
            required
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
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            minLength="5"
            maxLength="150"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            minLength="10"
            maxLength="10"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            placeholder="phone"
            required
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
            placeholder="Dob"
            required
          />
          <label htmlFor="floatingInput">Date of Birth</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <Link to="/signIn">Already a User</Link>
          </label>
        </div>
        <button className="w-100 btn rounded fs-5 btn-primary" type="submit">
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
