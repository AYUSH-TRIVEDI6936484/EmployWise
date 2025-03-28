import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/UserList';
import EditList from './pages/EditList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/edit/:id" element={<EditList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
