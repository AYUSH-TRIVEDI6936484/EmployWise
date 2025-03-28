import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { setToken, getToken } from '../utils/auth';
import Header from '../components/Header';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            navigate('/users');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            setToken(res.data.token);
            navigate('/users');
        } catch (err) {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white transition-all">
            <Header showLogout={false} />
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded-2xl p-8 w-96 space-y-6 transition-all"
                >
                    <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 tracking-wide">Welcome Back</h2>
                    {error && <p className="text-center text-red-500 font-medium">{error}</p>}

                    {/* Email Input */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="eve.holt@reqres.in"
                            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
