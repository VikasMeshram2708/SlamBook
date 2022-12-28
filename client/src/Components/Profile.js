import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [addedRes, setAddRes] = useState(false); // set the response for adding new slams
  const [invalidBody, setInvalidBody] = useState(false);
  const [notProvided, setNotProvided] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [newUpdateButton, setNewUpdateButton] = useState(false);
  let [userParamId, setUserParamId] = useState("");
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  // create api
  const apiUri = "api/slams/createSlam";

  const getCurrentUser = async () => {
    const response = await fetch("/api/auth/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    return response.json();
    // console.log("dodo", json);
  };

  const getMe = async () => {
    const response = await fetch("/api/slams/getMe", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const json = await response.json();
    // console.log(json.message);
    setUserParamId(json.message[0]._id);
    // console.log("me", json.message);
  };

  const formSubmitted = useCallback(
    async (event) => {
      event.preventDefault();
      const data = {
        title,
        tag,
        description,
      };
      // console.log(data);
      const response = await fetch(apiUri, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
      });
      const json = await response.json();
      console.log(json.data.user);
      if (response.status === 201) {
        setAddRes(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      if (response.status === 422) {
        setInvalidBody(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      if (response.status === 500) {
        setNotProvided(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    [title, tag, description]
  );

  const getAllSlams = async () => {
    const response = await fetch("api/slams/mySlams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const json = await response.json();
    // console.log(json.message);
    setItems(json.message);
  };

  // Delete the slam
  const deleteSlam = async () => {
    // console.log(userParamId);
    const response = await fetch(`/api/slams/deleteSlam/${userParamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    await response.json();
    setDeleteSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    // console.log(json);
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    getMe(); // for gettting the userId to put of api{:/id}
    getAllSlams();
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {addedRes ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Your New Slam was Added...</strong>
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
      {invalidBody ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Try, to create Slams with valid credentials</strong>
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
      {notProvided ? (
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
      {deleteSuccess ? (
        <div
          className="text-center alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Your Slam was Successfully Deleted</strong>
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
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            placeholder="Description"
          />
          <label htmlFor="floatingPassword">Description</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="tag"
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
            }}
            placeholder="Tag"
          />
          <label htmlFor="floatingPassword">Tag</label>
        </div>
        {!newUpdateButton ? (
          <button
            className="w-100 btn btn-lg btn-outline-primary"
            type="submit"
          >
            Add to SlamBook
          </button>
        ) : (
          <button
            className="w-100 btn btn-lg btn-outline-primary"
            type="submit"
          >
            Make New Change
          </button>
        )}
      </form>
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {items.map((item) => {
            // console.log(item._id)
            return (
              <div
                className="col"
                key={item.description.length + Math.random()}
              >
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <h3 className="card-text">
                      <i>{item.description}</i>
                    </h3>
                    <h4 className="card-title">TAG : {item.tag}</h4>
                    <hr />
                    <i className="card-title">{item.created_on}</i>
                    <hr />
                    <button
                      onClick={deleteSlam}
                      className="btn btn-sm btn-danger"
                      type="button"
                    >
                      Delete
                    </button>
                    <button
                      onClick={async () => {
                        setNewUpdateButton(true);
                        setTitle(item.title);
                        setDescription(item.description);
                        setTag(item.tag);
                      }}
                      className="mx-2 btn btn-sm btn-primary"
                      type="button"
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

export default Profile;
