import React from "react";

const Home = (props) => {
  return (
    <div className="container">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="https://is.gd/67Gk5V"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            {props.title}
          </h1>
          <p className="lead">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

Home.defaultProps = {
  title:"SlamBook - Quote Your Dearest Dream...",
  description:"A slam book is a notebook which is passed among children and teenagers. The keeper of the book starts by posing a question and the book is then passed round for each contributor to fill in their own answer to the question."
}

export default Home;
