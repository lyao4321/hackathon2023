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
import MenteeRegisterFull from './containers/Register';
import CompanyRegisterFull from './containers/CompanyRegister';
import AboutUs from './containers/AboutUs';
import UserDashboard from './containers/Dashboard';
import UserForm from './containers/UserForm';
import UserProfile from './containers/UserProfile';
import CompanyForm from './containers/CompanyForm';


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
		<Route path="/user/mform" element={<CompanyForm/>}/>
            </Routes>
        </Router>
    );
}


export default App;
