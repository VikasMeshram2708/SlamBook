import React, { useState, useCallback } from "react";

const Profile = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();
      const data = {
        title,
        tag,
        description,
      };
      console.log(data);
    },
    [title, tag, description]
  );

  return (
    <>
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
        <button className="w-100 btn btn-lg btn-outline-primary" type="submit">
          Add to SlamBook
        </button>
      </form>
    </>
  );
};

export default Profile;
