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
import '../../styles/register.css';

function Register(): React.ReactElement {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error , setError] = useState<boolean>(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };


    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
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
        console.log('Password:', password);

        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
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
                navigate('/user/form');
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
        <RegisterBar isCompany={false}/>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <br/>
                <Typography component="h1" variant="h5">
                    Job Seeker Register
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <div className='grid'>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label="First Name"
                            name="firstname"
                            autoComplete="firstname"
                            autoFocus
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="lastname"
                            autoComplete="lastname"
                            autoFocus
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </div>
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
                        Already have an account? <Link href="/login" variant="body2">Click here to login</Link>
                    </Typography>
                </form>
            </div>
        </Container>
        </>
    );
}

export default Register;
