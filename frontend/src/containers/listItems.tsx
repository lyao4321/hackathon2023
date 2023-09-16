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

const mainNavigationRoutes = {
  'Dashboard': { path: '/', icon: <DashboardIcon /> },
  'Applications': { path: '/applications', icon: <PaperIcon /> },
  'Mentors': { path: '/mentors', icon: <PeopleIcon /> },
  'Profile': { path: '/profile', icon: <BarChartIcon /> },
  'Settings': { path: '/settings', icon: <LayersIcon /> },
};

const secondaryNavigationRoutes = {
  'Log Out': { path: '/logout', icon: <AssignmentIcon /> } // Note: This might not be a route, but rather a function to log the user out.
};

export function MainListItems() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {Object.entries(mainNavigationRoutes).map(([key, { path, icon }]) => (
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

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Quick Access
      </ListSubheader>
      {Object.entries(secondaryNavigationRoutes).map(([key, { path, icon }]) => (
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
