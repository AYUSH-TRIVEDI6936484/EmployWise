import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import UserList from './pages/UserList';
import EditList from './pages/EditList.jsx';
import { getToken } from './utils/auth';

function App() {
  const token = getToken();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/users" /> : <Login />} />
        <Route path="/users" element={token ? <UserList /> : <Navigate to="/" />} />
        <Route path="/edit/:id" element={token ? <EditList /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;