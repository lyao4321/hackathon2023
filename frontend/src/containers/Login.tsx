import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Link,
    Button,
    Container,
    TextField,
    Typography,
    CssBaseline,
} from '@mui/material';
import '../styles/login.css';

function Login(): React.ReactElement {
    const [credential, setCredential] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigate();

    

    const handleCredentialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredential(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    credential: credential,
                    password: password
                })
            });
            const data = await response.json();
            if (response.status === 200 && data.token) {
                // Save the token as before
                sessionStorage.setItem('token', data.token);
        
                // Redirect using the new API
                navigation('/dashboard');
            }
            else {
                // Handle any login errors here. You might want to set some state to display an error message to the user.
                console.error(data.error);
            }
        } catch (error) {
            // Handle fetch errors here. E.g., network issues or invalid JSON responses.
            console.error('Error fetching:', error);
        }
    };

    return (
        <Container component="main" maxWidth="lg">
        <div className="grid-container">

            <div className="container1">
            <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
                        Job Seeker Login
                    </Typography>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="credential"
                            label="Email Address or Username"
                            name="credential"
                            autoComplete="credential"
                            autoFocus
                            value={credential}
                            onChange={handleCredentialChange}
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
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                        Don't have an account? <Link href="/register" variant="body2">Click here to register</Link>
                    </Typography>

                </div>

            </div>

            <div className='container2'>
                <p>Seek <b>Opportunities</b> and <b>Get Hired</b></p>
            </div>

        </div>
        </Container>
    );
}

export default Login;
