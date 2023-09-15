import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import Navbar from './containers/Navbar';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/nav" element={<Navbar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
