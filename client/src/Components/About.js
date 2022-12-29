import React from "react";
import { useContext } from "react";
import SlamContext from "../Context/Slams/SlamContext";
const About = () => {
  const users = useContext(SlamContext);
  const { currentUsers } = users;
  // console.log("about",currentUsers);
  return (
    <>
    <h2 className="text-center mt-5">List of Our Dearest Users</h2>
      <div className="container mt-5 rounded">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {currentUsers.map((user) => {
            return (
              <div className="col" key={user.email}>
                <div className="card">
                  <img
                    src="https://is.gd/ONLzWQ"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="text-center card-title">{user.name}</h5>
                    <p className="text-center card-text">{user.email}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default About;
