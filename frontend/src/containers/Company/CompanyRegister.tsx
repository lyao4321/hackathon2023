import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
    TextField,
    Typography,
    CssBaseline,
    Link,
} from '@mui/material';
import RegisterBar from '../RegisterBar';
import Autocomplete from '@mui/material/Autocomplete';

function CompanyRegister(): React.ReactElement {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [company, setCompany] =  useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error , setError] = useState<boolean>(false);
    
    const companies: any[] = ['google'];


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
	setError(false);
        if (password !== confirmPassword) {
            console.error("Passwords don't match!");
	    setError(true);
            return;
        }
        console.log('Email:', email);
        console.log('Company:', company);
        console.log('Password:', password);

	try {
            const response = await fetch('http://localhost:8080/api/mregister', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company: company,
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
	    console.log(data);
            if (response.status === 200) {
                // Save the token as before
                console.log(data);
                sessionStorage.setItem('token', data.token);
        
                // Redirect using the new API
                navigate('/dashboard');
            }
            else {
                console.error(data.error);
            }
        } catch (error) {
            // Handle fetch errors here. E.g., network issues or invalid JSON responses.
            console.error('Error fetching:', error);
	}
	

    };

    return (
        <>
        <RegisterBar isCompany={true} />
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <br/>
            <div>
                <Typography component="h1" variant="h5">
                    Company Register
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <Autocomplete
                        id="companies"
                        options={companies}
                        getOptionLabel={(option: string) => option}
                        value={company}
                        onChange={(_, newValue: string | null) => setCompany(newValue || '')}
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Company"
                            />
                        )}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}

                    />
		    {error?<p style={{color:'red'}}>Passwords don't match!</p>:<p></p>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
			onClick={handleSubmit}
                    >
                        Register
                    </Button>
                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                        Already have a company account? <Link href="/company/login" variant="body2">Click here to login</Link>
                    </Typography>
                </form>
            </div>
        </Container>
        </>
    );
}

export default CompanyRegister;
