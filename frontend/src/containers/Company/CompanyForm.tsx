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

function CompanyForm(): React.ReactElement {
    const [location, setLocation] = useState<string>('');
    const [industry, setIndustry] = useState<string>('');
    const [startupExperience, setStartupExperience] = useState<string>('');
    const [skills, setSkills] = useState<string>('');
    const navigation = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Send the data to your API, handle response/errors accordingly
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/mform', {
                method: 'POST',
                credentials: 'include',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    location: location,
                    industry: industry,
                    startupExperience: startupExperience,
                    skills: skills
                })
            });
            const data = await response.json();
            if (response.status === 200) {
                // Redirect using the new API
                navigation('/company/dashboard');
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
                            type="number"
                            id="experience" 
                            label="Years of Experience" 
                            value={startupExperience} 
                            onChange={(e) => setStartupExperience(e.target.value)} 
                        />
                        <TextField 
                            variant="outlined" margin="normal" required fullWidth 
                            id="skills" 
                            label="Skills" 
                            value={skills} 
                            onChange={(e) => setSkills(e.target.value)} 
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

export default CompanyForm;
