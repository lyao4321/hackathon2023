import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import CompanyLogin from './containers/Company/CompanyLogin';
import Login from './containers/Seekers/Login';
import Navbar from './containers/Navbar';
import MenteeRegisterFull from './containers/Seekers/Register';
import CompanyRegisterFull from './containers/Company/CompanyRegister';
import AboutUs from './containers/AboutUs';
import UserDashboard from './containers/Seekers/Dashboard';
import UserForm from './containers/Seekers/UserForm';
import UserProfile from './containers/Seekers/UserProfile';
import { Reccomendations } from './containers/Reccomendation/FindReccomendations';
import CompanyDashboard from './containers/Company/CompanyDashboard';
import CompanyForm from './containers/Company/CompanyForm';

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
                <Route path="/profile" element={<UserProfile user={{username:'username',email:'email',avatarUrl:''}}/>}/>
                <Route path="/dashboard" element={<UserDashboard/>}/>
                <Route path="/user/form" element={<UserForm/>}/>
                <Route path="/user/reccomendations" element={<Reccomendations/>}/>
                <Route path="/company/dashboard" element={<CompanyDashboard />}/>
                <Route path="/company/form" element={<CompanyForm/>}/>
            </Routes>
        </Router>
    );
}


export default App;
