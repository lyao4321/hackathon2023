import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';


const ProfileCarousel = (props:any) => {
  const [currentProfile, setCurrentProfile] = useState(0);
  const {profiles} = props

  const prevProfile = () => {
    setCurrentProfile((prev) => (prev === 0 ? profiles.length - 1 : prev - 1));
  };

  const nextProfile = () => {
    setCurrentProfile((prev) => (prev === profiles.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel">
      <Button onClick={prevProfile} className="carousel-button">
        <ChevronLeft />
      </Button>
      <Card>
        <CardContent>
          <img
            src={profiles[currentProfile].imageUrl}
            alt={profiles[currentProfile].name}
            className="profile-image"
          />
          <Typography variant="h5">{profiles[currentProfile].name}</Typography>
          <Typography variant="subtitle1">
            {profiles[currentProfile].headline}
          </Typography>
        </CardContent>
      </Card>
      <Button onClick={nextProfile} className="carousel-button">
        <ChevronRight />
      </Button>
    </div>
  );
}

export default ProfileCarousel;
