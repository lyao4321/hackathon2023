import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import './mycarousel.css';

const ProfileCarousel = (props:any) => {
  const [currentProfile, setCurrentProfile] = useState(0);
  const prevProfile = () => {
    setCurrentProfile((prev) => (prev === 0 ? props.profiles.length - 1 : prev - 1));
  };

  const nextProfile = () => {
    setCurrentProfile((prev) => (prev === props.profiles.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel">
      <Button onClick={prevProfile} className="carousel-button">
        <ChevronLeft />
      </Button>
      <Card>
        <CardContent>
          <img
            src={props.profiles[currentProfile].imageUrl}
            alt={props.profiles[currentProfile].name}
            
          />
          <Typography variant="h5">{props.profiles[currentProfile].name}</Typography>
          <Typography variant="subtitle1">
            {props.profiles[currentProfile].headline}  &nbsp;&nbsp;&nbsp; <Button>Learn more</Button>
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
