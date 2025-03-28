import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function UserList() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        const res = await getUsers(page);
        setUsers(res.data.data);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(prev => prev.filter(user => user.id !== id));
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    return (
        <div className="relative p-6 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <Header />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {users.map(user => (
                    <div
                        key={user.id}
                        className="border rounded-2xl p-5 shadow-md hover:shadow-lg transition-all bg-white dark:bg-gray-800"
                    >
                        <img
                            src={user.avatar}
                            alt={user.first_name}
                            className="w-28 h-28 rounded-full mx-auto shadow"
                        />
                        <h3 className="text-center mt-4 text-lg font-semibold">
                            {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                            {user.email}
                        </p>
                        <div className="flex justify-around mt-5">
                            <button
                                onClick={() => navigate(`/edit/${user.id}`)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded transition-all"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 space-x-4">
                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all"
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UserList;
