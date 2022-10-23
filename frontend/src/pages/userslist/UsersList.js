// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// styles
import styles from './UsersList.module.css';
// components
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
// actions
import { listUsers, deleteUser } from '../../store/actions/userActions';


const UsersList = () => {
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector(state => state.listUsers);
    const { success } = useSelector(state => state.deleteUser);

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch, success]);

    const removeHandler = (id) => {
        dispatch(deleteUser(id));
    };

    return (
        <div className={styles.userslist}> 
            <h1>Users:</h1>
            {loading && <Loader />}
            {error && <p className='error'>{error}</p>}
            <table className={styles.container}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>isAdmin</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody >
                    {users && users.map(user => (
                        <tr key={user._id} className={styles.container}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? <i className='fas fa-check' style={{color: 'green'}}></i> : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                            <td><Link to={`/admin/users/${user._id}`}>Edit</Link></td>
                            <td><button className='secondary-btn' onClick={() => removeHandler(user._id)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
    )
};

export default UsersList;