import { useEffect, useRef, useState } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function UserList() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const updatedUserRef = useRef(null);

    useEffect(() => {
        const updated = location.state?.updatedUser;

        if (updated && !updatedUserRef.current) {
            updatedUserRef.current = updated;

            setUsers(prev =>
                prev.map(u => u.id === updated.id ? { ...u, ...updated } : u)
            );

            navigate(location.pathname, { replace: true });
        } else {
            fetchUsers();
        }
    }, [page, location, navigate]);

    useEffect(() => {
        updatedUserRef.current = null;
    }, [page]);

    const fetchUsers = async () => {
        const res = await getUsers(page);
        const originalUsers = res.data.data;

        const storedUpdates = JSON.parse(sessionStorage.getItem('userUpdates') || '{}');

        const mergedUsers = originalUsers.map(user =>
            storedUpdates[user.id] ? { ...user, ...storedUpdates[user.id] } : user
        );

        setUsers(mergedUsers);
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
        <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-sky-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white transition-all duration-500 ease-in-out">

            <Header />

            <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 dark:bg-gray-700/70 backdrop-blur-md hover:scale-110 transition-all duration-300 shadow-xl text-xl text-black dark:text-white rounded-full w-12 h-12 flex items-center justify-center z-50"
                title="Previous Page"
            >
                ❮
            </button>

            <button
                onClick={() => setPage(p => p + 1)}
                className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-gray-500 dark:bg-gray-700/70 backdrop-blur-md hover:scale-110 transition-all duration-300 shadow-xl text-xl text-black dark:text-white rounded-full w-12 h-12 flex items-center justify-center z-50"
                title="Next Page"
            >
                ❯
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-4 transition-all">
                {users.map(user => (
                    <div
                        key={user.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <img
                            src={user.avatar}
                            alt={user.first_name}
                            className="w-28 h-28 rounded-full mx-auto shadow-lg border-4 border-white dark:border-gray-600 transition-all duration-300 group-hover:scale-105"
                        />
                        <h3 className="text-center mt-4 text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
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
        </div>
    );
}

export default UserList;
