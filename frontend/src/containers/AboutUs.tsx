import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import NavBar from './Navbar';



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://startup.com/">
        Local
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function Dashboard() {
  const navigate = useNavigate();

  const pageRoutes = {
    'Get Started': '/company/register',
  };  

  const navigateSite = (page: string) => {
    type PageKey = keyof typeof pageRoutes;
    const route = pageRoutes[page as PageKey];
    if (route) {
      navigate(route);
    }
  };


  return (
    <>
    <NavBar/>

        <CssBaseline />
        <main>
            {/* Hero unit */}
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
            >
            <Container maxWidth="sm">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Welcome to Local
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Local is a proprietary job-matching platform designed to optimize and streamline the hiring process. The core functionality lies in its sophisticated recommendation system, which intelligently pairs recruiters with potential candidates based on specific areas of expertise.
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                <Button onClick={() => navigateSite('Get Started')} variant="contained">Get Started</Button>
                <Button variant="outlined">See Available Jobs</Button>
                </Stack>
            </Container>
            </Box>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
            Footer
            </Typography>
            <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
            >
            Something here to give the footer a purpose!
            </Typography>
            <Copyright />
        </Box>

        
        {/* End footer */}
    </>
  );

}