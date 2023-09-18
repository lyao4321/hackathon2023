import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
    TextField,
    Typography,
    CssBaseline,
} from '@mui/material';
import '../../styles/userform.css';
import NavBar from '../Navbar';
import { generateKey } from 'crypto';
import Autocomplete from '@mui/material/Autocomplete';
import { start } from 'repl';



function UserForm(): React.ReactElement {
    const [age, setAge] = useState<number | null>(null);
    const [gender, setGender] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [industry, setIndustry] = useState<string>('');
    const [interests, setInterests] = useState<string>('');
    const [startupExperience, setStartupExperience] = useState<string>('');
    const [mentor, setMentor] = useState<string>('');
    const [university, setUniversity] = useState<string>('');
    const [hours, setHours] = useState<number | null>(null);
    const [skills, setSkills] = useState<string>('');

    const navigation = useNavigate();
    const industries: string[] = ['Tech', 'Finance', 'Health', /* ... other industries */];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Send the data to your API, handle response/errors accordingly
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/form', {
                method: 'POST',
                credentials: 'include',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    gender: gender,
                    age: age,
                    location: location,
                    industry: industry,
                    interests: interests,
                    startupExperience: startupExperience,
                    university: university,
                    hours: hours,
                    skills: skills,
                    received_connects: []
                })
            });
            console.log(age, gender, location, industry, interests, startupExperience, university, skills, hours);
            const data = await response.json();
            if (response.status === 200) {
                // Redirect using the new API
                navigation('/dashboard');
            }
            else {
                // Handle any login errors here. You might want to set some state to display an error message to the user.
                console.error(data.error);
            }
        }
        catch (error) {
            // Handle fetch errors here. E.g., network issues or invalid JSON responses.
            console.error('Error fetching:', error);
        }

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
                        <Autocomplete
                            id="industry"
                            options={industries}
                            getOptionLabel={(option: string) => option}
                            value={industry}
                            onChange={(_, newValue: string | null) => setIndustry(newValue || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Industry"
                                />
                            )}
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
                            onClick={handleSubmit}
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
