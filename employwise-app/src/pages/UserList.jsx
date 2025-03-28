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
            {/* <h1 className="text-2xl font-bold mb-4 mt-10 text-center">Hello ReqRes users!</h1> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <div key={user.id} className="border p-4 rounded bg-white dark:bg-gray-800">
                        <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mx-auto" />
                        <h3 className="text-center mt-2">{user.first_name} {user.last_name}</h3>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                        <div className="flex justify-around mt-4">
                            <button onClick={() => navigate(`/edit/${user.id}`)} className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
                            <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="px-4 py-2 bg-gray-300 dark:bg-gray-800">Prev</button>
                <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-300 dark:bg-gray-800">Next</button>
            </div>
        </div>
    );
}

export default UserList;
