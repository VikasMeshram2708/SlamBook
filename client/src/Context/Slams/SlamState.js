import SlamContext from "./SlamContext";
import { useEffect, useState } from "react";

const SlamState = (props) => {
  // store all the slams items state
  const [items, setItems] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);

  // get all slams of the user
  const getMySlams = async () => {
    const response = await fetch("/api/slams/mySlams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setItems(json.message);
  };

  // const get all the users
  const getAllUsers = async () => {
    const response = await fetch("/api/auth/showAllUsers");
    const json = await response.json();
    // console.log(json.message);
    setCurrentUsers(json.message);
    setCurrentUsers(json.message);
  };
  
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getMySlams(); // from prevent the error when use was not logged in it was sending the http request to fetch the user slams
    }
    getAllUsers();
  }, []);
  return (
    <SlamContext.Provider value={{ items, currentUsers }}>
      {props.children}
    </SlamContext.Provider>
  );
};

export default SlamState;
