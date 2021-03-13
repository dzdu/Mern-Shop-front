import React from 'react';
import AdminNav from '../../../components/nav/adminNav';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../css/admin.css';
import CategoryForm from '../../../components/forms/categoryForm';

import { getCategories } from '../../../functions/category';
import { createSub, getSub, getSubs, removeSub } from '../../../functions/sub';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [subs, setSubs] = React.useState([]);

  //search
  //Step 1
  const [keyword, setKeyword] = React.useState('');

  React.useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((categories) => {
        setCategories(categories.data);
        //console.log(categories);
      })
      .catch((err) => console.log(err));

  const loadSubs = () =>
    getSubs()
      .then((sub) => {
        setSubs(sub.data);
        //console.log(categories);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created :)`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
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
          <h1>Create Subcategory</h1>
          <div className="form-group">
            <label>Choose parent category</label>
            <select
              name="category"
              className="select-category"
              onChange={(e) => setCategory(e.target.value)}>
              <option> Please select</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

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
                {subs.filter(searhced(keyword)).map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.slug}</td>
                    <td>{s.createdAt}</td>
                    <td>{s.updatedAt}</td>
                    <button>
                      <Link to={`/admin/sub/${s.slug}`}>
                        <EditOutlined /> Edit
                      </Link>
                    </button>
                    <button onClick={() => handleRemove(s.slug)}>
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

export default SubCreate;
