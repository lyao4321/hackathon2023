import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
    TextField,
    Typography,
    CssBaseline,
} from '@mui/material';
import '../styles/userform.css';
import NavBar from './Navbar';

function UserForm(): React.ReactElement {
    const [age, setAge] = useState<number | null>(null);
    const [gender, setGender] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [industry, setIndustry] = useState<string>('');
    const [interests, setInterests] = useState<string>('');
    const [startupExperience, setStartupExperience] = useState<string>('');
    const [university, setUniversity] = useState<string>('');
    const [hours, setHours] = useState<number | null>(null);
    const [skills, setSkills] = useState<string>('');

    const navigation = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Send the data to your API, handle response/errors accordingly
    };

    return (
    <>
    <NavBar/>
        <Container component="main" maxWidth="lg">
        <div className="grid-container">
            <div className="container1">
            <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
                        User Details
                    </Typography>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            type="number"
                            id="age" 
                            label="Age" 
                            value={age || ''} 
                            onChange={(e) => setAge(Number(e.target.value))} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="gender" 
                            label="Gender" 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="location" 
                            label="Location" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="industry" 
                            label="Industry" 
                            value={industry} 
                            onChange={(e) => setIndustry(e.target.value)} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="interests" 
                            label="Interests" 
                            value={interests} 
                            onChange={(e) => setInterests(e.target.value)} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="experience" 
                            label="Years of Experience" 
                            value={startupExperience} 
                            onChange={(e) => setStartupExperience(e.target.value)} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="university" 
                            label="University" 
                            value={university} 
                            onChange={(e) => setUniversity(e.target.value)} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="skills" 
                            label="Skills" 
                            value={skills} 
                            onChange={(e) => setSkills(e.target.value)} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="hours" 
                            label="Hours available per week" 
                            value={hours} 
                            onChange={(e) => setHours(Number(e.target.value))} 
                        />
                        
                        {/* ... Add other TextField components similarly for each input field */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>

            <div className='container2'>
                {/* You can add some info or an image on this side, similar to your Login component */}
            </div>
        </div> 
        </Container>
    </>
    );
}

export default UserForm;
