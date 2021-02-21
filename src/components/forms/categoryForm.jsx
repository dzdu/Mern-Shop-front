import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit} className="category--form">
    <label htmlFor="category">Category Name</label>
    <br />
    <input
      type="text"
      name="name"
      className="form-control"
      value={name}
      onChange={(e) => setName(e.target.value)}
      autoFocus
      required
    />
    <br />
    <button disabled={name.length < 2} className="category--form--button">
      Save category
    </button>
  </form>
);

export default CategoryForm;
