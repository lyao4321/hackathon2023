import {useState} from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "../Navbar";
import ProfileCarousel from './Carousel'
import { useNavigate } from 'react-router-dom';

interface Profile {
  name: string;
  headline: string;
  imageUrl: string;
}

function Reccomendations() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  const pageRoutes = {
    'login':'/login',
  };  

  const navigateSite = (page: string) => {
    type PageKey = keyof typeof pageRoutes;
    const route = pageRoutes[page as PageKey];
    if (route) {
      navigate(route);
    }
  };

  const RerunReccomendations = (userData:any) => {
    const profiles = [
      {
        name: 'John Doe',
        headline: 'Software Engineer',
        imageUrl: 'male.jpg',
      },
      {
        name: 'Jane Smith',
        headline: 'Product Manager',
        imageUrl: 'female.jpg',
      },
    ];
    setProfiles(profiles) 
  } 
  
  const user = {'user':'username'};
  return (
  <>
      <NavBar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Get some mentor reccomendations here
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          We use our propriotary algorithm to bring personalized reccomendations
          to you.
        </Typography>
        <Button onClick={() => RerunReccomendations(user)} variant="contained">
          Get Reccomendations!
        </Button>
      <ProfileCarousel profiles={profiles}/>
      </Container>
    </>
  );
}
export {Reccomendations};