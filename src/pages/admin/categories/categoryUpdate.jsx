import React from 'react';
import AdminNav from '../../../components/nav/adminNav';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../css/admin.css';
import CategoryForm from '../../../components/forms/categoryForm';
import { updateCategory, getCategory } from '../../../functions/category';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug)
      .then((categories) => {
        setName(categories.data.name);
        //console.log(categories);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated :)`);
        history.push('/admin/category');
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
          <h2 style={{ textTransform: 'uppercase' }}>Update Category {match.params.slug}</h2>
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

export default CategoryUpdate;
