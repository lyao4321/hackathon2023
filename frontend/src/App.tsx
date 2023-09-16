import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import CompanyLogin from './containers/CompanyLogin';
import Login from './containers/Login';
import Navbar from './containers/Navbar';
import MenteeRegisterFull from './containers/MenteeRegisterFull';
import CompanyRegisterFull from './containers/CompanyRegisterFull.tsx';
import AboutUs from './containers/AboutUs';
import UserDashboard from './containers/Dashboard';
import UserForm from './containers/UserForm';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/nav" element={<Navbar />} />
                <Route path="/company/login" element={<CompanyLogin />} />
                <Route path="/company/register" element={<CompanyRegisterFull/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<MenteeRegisterFull />} />
                <Route path="/" element={<Navigate to="/aboutus" />} />
                <Route path="/aboutus" element={<AboutUs/>}/>

                <Route path="/dashboard" element={<UserDashboard/>}/>
                <Route path="/user/form" element={<UserForm/>}/>
            </Routes>
        </Router>
    );
}

export default App;
