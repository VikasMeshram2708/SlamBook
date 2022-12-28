import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const formSubmitted = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
      phone,
      dob,
    };
    console.log(data);
  };

  return (
    <>
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