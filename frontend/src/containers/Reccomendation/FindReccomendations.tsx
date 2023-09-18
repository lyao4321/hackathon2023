import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "../Navbar";
import ProfileCarousel from "./Carousel";
import { Stack } from "@mui/material";
// import { useNavigate } from "react-router-dom";

interface Profile {
  name: string;
  headline: string;
  imageUrl: string;
}

function Reccomendations() {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      name: "John Doe",
      headline: "Software Engineer",
      imageUrl: "/assets/male.jpg",
    },
    {
      name: "Jane Smith",
      headline: "Product Manager",
      imageUrl: "/assets/female.jpg",
    },
  ]);
  // const navigate = useNavigate();

  // const pageRoutes = {
  //   login: "/login",
  // };

  // const navigateSite = (page: string) => {
  //   type PageKey = keyof typeof pageRoutes;
  //   const route = pageRoutes[page as PageKey];
  //   if (route) {
  //     navigate(route);
  //   }
  // };

  const RerunReccomendations = async () => {
    const storedToken = sessionStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/api/getRecMentee', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              'Content-Type': 'application/json',
          },
            body: JSON.stringify({})
        });
  
        const responseData = await response.json();
        
        if (response.status === 200) {
            console.log(responseData);
            // {
            //   name: "John Doe",
            //   industry: "Software Engineer",
            //   gender:'Male',
            //   location:'Buffalo',
            //   imageUrl: "/assets/male.jpg",
            // },
          // setProfiles(profiles);
        } else {
            console.error(responseData.error);
        }
    } catch (error) {
        console.error('Error while adding company:', error);
    }
    };

  return (
    <>
      <NavBar />
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          We found a few matches for you
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Connect to these prople and nring them in your network to succeed!
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            onClick={() => RerunReccomendations()}
            variant="contained"
          >
            Get Reccomendations!
          </Button>
        </Stack>
        <br/>
        <br/>
        <br/>
        <ProfileCarousel profiles={profiles} />
      </Container>
    </>
  );
}
export { Reccomendations };
