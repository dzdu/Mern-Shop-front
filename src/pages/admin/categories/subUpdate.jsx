import React from 'react';
import AdminNav from '../../../components/nav/adminNav';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../css/admin.css';
import CategoryForm from '../../../components/forms/categoryForm';

import { getCategories } from '../../../functions/category';
import { getSub, updateSub } from '../../../functions/sub';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [parent, setParent] = React.useState('');

  React.useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((categories) => {
        setCategories(categories.data);
        //console.log(categories);
      })
      .catch((err) => console.log(err));

  const loadSub = () =>
    getSub(match.params.slug)
      .then((sub) => {
        setName(sub.data.name);
        setParent(sub.data.parent);
        //console.log(categories);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated :)`);
        history.push('/admin/sub');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data + '' + err.message);
      });
  };

  return (
    <>
      <AdminNav />
      {!loading ? (
        <div className="admin-container category">
          <h2 style={{ textTransform: 'uppercase' }}>Update Subcategory {match.params.slug}</h2>
          <div className="form-group">
            <label>Choose parent category</label>
            <select
              name="category"
              className="select-category"
              onChange={(e) => setParent(e.target.value)}>
              <option> Please select</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    selected={category._id === parent}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form">
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
          </div>
        </div>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </>
  );
};

export default SubUpdate;
