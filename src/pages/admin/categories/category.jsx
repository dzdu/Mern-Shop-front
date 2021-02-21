import React from 'react';
import AdminNav from '../../../components/nav/adminNav';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../css/admin.css';
import CategoryForm from '../../../components/forms/categoryForm';

import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  //search
  //Step 1
  const [keyword, setKeyword] = React.useState('');

  React.useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((categories) => {
        setCategories(categories.data);
        //console.log(categories);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created :)`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data + '' + err.message);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm('Are you sure you want to delete');
    // console.log(answer, slug);
    if (window.confirm('Are you sure you want delete category?')) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data + '' + err.message);
        });
    }
  };

  //step 3
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  //step 4: map
  const searhced = (keyword) => (category) => category.name.toLowerCase().includes(keyword);

  return (
    <>
      <AdminNav />
      {!loading ? (
        <div className="admin-container category">
          <h1>Create Category</h1>
          <div className="form">
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

            <hr />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>
                    {/* Step 2: input search fill */}
                    <input
                      type="search"
                      placeholder="search category"
                      value={keyword}
                      onChange={handleSearchChange}
                      className="form-search"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* step 5: adding search btw map and categories  */}
                {categories.filter(searhced(keyword)).map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td>{category.createdAt}</td>
                    <td>{category.updatedAt}</td>
                    <button>
                      <Link to={`/admin/category/${category.slug}`}>
                        <EditOutlined /> Edit
                      </Link>
                    </button>
                    <button onClick={() => handleRemove(category.slug)}>
                      <DeleteOutlined /> Delete
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </>
  );
};

export default CategoryCreate;
