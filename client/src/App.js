import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import Slams from "./Components/Slams";
import SignUp from "./Components/Forms/SignUp";
import SignIn from "./Components/Forms/SignIn";
import SlamState from "./Context/Slams/SlamState";

const App = () => {
  return (
    <SlamState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/slams" element={<Slams />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </Router>
    </SlamState>
  );
};

export default App;
