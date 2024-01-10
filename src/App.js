import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Artists from './pages/Artists';
import CreateAlbum from './pages/CreateAlbum';
import Albums from './pages/Albums';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/create-album" element={<CreateAlbum />} />
                    <Route path="/albums" element={<Albums />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
        </Router>
        </UserProvider>
    );
};

export default App;
