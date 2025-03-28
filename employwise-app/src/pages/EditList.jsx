import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers, updateUser } from '../services/api';
import Header from '../components/Header';

function EditList() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUsers(1); // No endpoint for single user
            const found = res.data.data.find(u => u.id === parseInt(id));
            if (found) setUser(found);
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(id, user);
        navigate('/users');
    };

    return (
        <>
            <Header />
            <div className="relative flex justify-center items-center h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
                <form onSubmit={handleSubmit} className="p-6 border rounded w-96 bg-white dark:bg-gray-800">
                    <h2 className="text-xl font-bold mb-4">Edit User</h2>
                    <input
                        value={user.first_name}
                        onChange={e => setUser({ ...user, first_name: e.target.value })}
                        placeholder="First Name"
                        className="w-full p-2 border mb-4 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                    <input
                        value={user.last_name}
                        onChange={e => setUser({ ...user, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="w-full p-2 border mb-4 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                    <input
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                        className="w-full p-2 border mb-4 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2">Update</button>
                </form>
            </div>
        </>
    );
}

export default EditList;
