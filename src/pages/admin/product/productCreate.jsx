import React, { useState } from 'react';
import AdminNav from '../../../components/nav/adminNav';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../css/admin.css';

import { createProduct } from '../../../functions/product';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const initialState = {
  title: '',
  description: '',
  price: '',
  categorues: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'White', 'Red', 'Gold', 'Silver', 'Green', 'Blue', 'Multicolor'],
  brands: ['Apple', 'Samsung', 'HP', 'Xiaomi', 'Lenovo', 'LG', 'Microsoft', 'Huawei', 'Asus'],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success('Created :)');
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400 || err.response.status === 404) {
          toast.error('Could not create product, contact support');
        }
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, '-------', e.target.value);
  };

  return (
    <>
      <AdminNav />
      <div className="admin-container productCreate">
        <h1> Create Product </h1>
        <form onSubmit={handleSubmit}>
          <div className="category--form">
            <input
              type="text"
              name="title"
              className="product-form"
              value={title}
              onChange={handleChange}
              placeholder="Title"
              required="true"
            />
            <br />
            <textarea
              name="description"
              className="product-form"
              cols="30"
              rows="10"
              value={description}
              onChange={handleChange}
              placeholder="Description"
              required="true"></textarea>

            <br />
            <input
              type="number"
              name="price"
              className="product-form"
              value={price}
              onChange={handleChange}
              placeholder="Price"
              required="true"
            />
            <br />
            <label>Shipping </label>
            <select
              name="shipping"
              className="product-select"
              onChange={handleChange}
              required="true">
              <option>Please select:</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <br />
            <input
              type="number"
              name="quantity"
              className="product-form"
              value={quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required="true"
            />
            <br />
            <label>Color </label>
            <select name="color" className="product-select" onChange={handleChange} required="true">
              <option>Please select:</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <br />
            <label>Brand </label>
            <select name="brand" className="product-select" onChange={handleChange} required="true">
              <option>Please select:</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <br />
            <button>Create product</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductCreate;
