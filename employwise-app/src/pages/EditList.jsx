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
            const res = await getUsers(1); // Reqres has no /user/:id, so fetch all and filter
            const found = res.data.data.find(u => u.id === parseInt(id));
            if (found) setUser(found);
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(id, user); // mock success
        navigate('/users', { state: { updatedUser: { ...user, id: parseInt(id) } } });
    };

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-sky-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white transition-all">
                <form
                    onSubmit={handleSubmit}
                    className="w-96 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl p-8 shadow-lg space-y-6 transition-all"
                >
                    <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">Edit User</h2>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            value={user.first_name}
                            onChange={e => setUser({ ...user, first_name: e.target.value })}
                            placeholder="First Name"
                            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            value={user.last_name}
                            onChange={e => setUser({ ...user, last_name: e.target.value })}
                            placeholder="Last Name"
                            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditList;
