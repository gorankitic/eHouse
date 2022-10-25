// hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import { Link } from "react-router-dom";
import Loader from '../../components/Loader';
import Select from 'react-select';
// styles
import styles from './EditUser.module.css';
// actins
import { getUserDetails, updateUser } from "../../store/actions/userActions";
import { updateUserActions } from '../../store/slices/userSlices';

const EditUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector(state => state.userDetails);
    const { loading: loadingUpdate, error: errorUpdate, success } = useSelector(state => state.updateUser);


    const options = [{ value: true, label: 'Admin'  }, { value: false, label: 'User' }];

    useEffect(() => {
        if(success) {
            dispatch(updateUserActions.updateUserReset());
            navigate('/admin/users');
        } else {
            if(!user.name || user._id !== id) {
                dispatch(getUserDetails(id));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, user, id, navigate, success]);

    const handleEditUser = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
    }

    return (
        <div className={styles.edituser}>   
            <Link to='/admin/users'>Go Back</Link>
            <h1>Edit user</h1>
            <div className={styles.container}>
                <form onSubmit={handleEditUser}>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <p className='error'>{errorUpdate}</p>}
                    {loading && <Loader />}
                    {error && <p className='error'>{error}</p>}
                    <label>Name:</label>
                    <input 
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <label>Email:</label>
                    <input 
                        type='email' 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} 
                    />
                    <label>Select isAdmin:</label>
                    <Select 
                    //   className={`${styles.select} ${mode === 'dark' ? styles.dark : ''}`} 
                    options={options} 
                    onChange={(option) => setIsAdmin(option.value)}
                    />
                    <button className='secondary-btn'>Update</button>
                </form>
            </div>
        </div>
    )
};

export default EditUser;