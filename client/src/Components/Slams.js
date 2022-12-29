import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SlamContext from "../Context/Slams/SlamContext";

const Slams = () => {
  const details = useContext(SlamContext);
  const { items } = details;

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [newBtn, setNewBtn] = useState(false);

  const msg500 = "Some Internal Server Error";
  const msg201 = "Your new Slam was Successfully Added to SlamBook";
  const deleteMsg = "Your Slam Was Successfully Deleted";

  const getFieldsInfo = async () => {
    const data = {
      title,
      description,
      tag,
    };
    // console.log(data);
    const response = await fetch("/api/slams/createSlam", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const json = await response.json();
    console.log(json);
    if (response.status === 500) {
      setSuccessMsg(true);
      setErrorMsg(msg500);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    if (response.status === 201) {
      setSuccessMsg(true);
      setErrorMsg(msg201);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const formSubmitted = async (event) => {
    event.preventDefault();
    getFieldsInfo();
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

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
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            minLength="2"
            maxLength="150"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            placeholder="title"
          />
          <label htmlFor="floatingInput">Title</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            minLength="2"
            maxLength="250"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            placeholder="description"
          />
          <label htmlFor="floatingInput">Description</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="tag"
            minLength="1"
            maxLength="100"
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
            }}
            placeholder="tag"
          />
          <label htmlFor="floatingInput">Tag</label>
        </div>
        {!newBtn ? (
          <button className="w-100 btn rounded fs-5 btn-primary" type="submit">
            Add to Slambook
          </button>
        ) : (
          <button
            className="my-3 w-100 btn rounded fs-5 btn-primary"
            type="submit"
          >
            Update My Slam
          </button>
        )}
      </form>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {items.map((item) => {
            return (
              <div
                className="col"
                key={item.description.length + Math.random()}
              >
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>
                    <hr />
                    <h4 className="card-text">
                      <i>{item.description}</i>
                    </h4>
                    <h6>TAG : {item.tag}</h6>
                    <hr />
                    <i>{item.created_on}</i>
                    <hr />
                    <button
                      className="btn btn-sm btn-danger fs-5 rounded"
                      type="button"
                      onClick={async () => {
                        console.log(item._id)
                        const response = await fetch(
                          `/api/slams/deleteSlam/${item._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              authToken: localStorage.getItem("authToken"),
                            },
                          }
                        );
                        await response.json();
                        // console.log(json);
                        setSuccessMsg(true);
                        setErrorMsg(deleteMsg);
                        setTimeout(() => {
                          window.location.reload();
                        }, 3000);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-info mx-3 fs-5 rounded"
                      type="button"
                      onClick={() => {
                        // make available new button
                        setNewBtn(true);
                        setTitle(item.title);
                        setDescription(item.description);
                        setTag(item.tag);
                      }}
                    >
                      Update
                    </button>
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

export default Slams;
