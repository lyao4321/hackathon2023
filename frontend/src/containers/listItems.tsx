import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaperIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface dashboardProps {
	isCompany: boolean;
};

const seekerNavigationRoutes = {
  'Menu': { path: '/', icon: <DashboardIcon /> },
  'Applications': { path: '/applications', icon: <PaperIcon /> },
  'Mentors': { path: '/mentors', icon: <PeopleIcon /> },
  'Profile': { path: '/profile', icon: <BarChartIcon /> },
  'Settings': { path: '/settings', icon: <LayersIcon /> },
};

const companyNavigationRoutes = {
  'Dashboard': { path: '/company/dashboard', icon: <DashboardIcon /> },
  'Recommendations': { path: '/users/reccomendations', icon: <PaperIcon /> },
  'Proximity Matching': { path: '/users/map', icon: <PaperIcon />}
}

const secondaryNavigationRoutes = {
  'Log Out': { path: '/aboutus', icon: <AssignmentIcon /> } // Change logout path to /aboutus
};

export function MainListItems({isCompany}:dashboardProps)  {
  const navigate = useNavigate();

  const navigationRoutes = isCompany ? companyNavigationRoutes : seekerNavigationRoutes;

  return (
    <React.Fragment>
      {Object.entries(navigationRoutes).map(([key, { path, icon }]) => (
        <ListItemButton key={key} onClick={() => navigate(path)}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={key} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
}

export function SecondaryListItems() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Delete the user session
    sessionStorage.removeItem('token'); // assuming token is stored in session storage

    // Redirect to about us page
    navigate('/aboutus');
  }

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Quick Access
      </ListSubheader>
      {Object.entries(secondaryNavigationRoutes).map(([key, { path, icon }]) => (
        <ListItemButton 
          key={key} 
          onClick={key === 'Log Out' ? handleLogout : () => navigate(path)}
        >
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={key} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
}
