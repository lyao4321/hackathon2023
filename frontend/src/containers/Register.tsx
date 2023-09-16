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

function Register(): React.ReactElement {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error , setError] = useState<boolean>(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
	setError(false);
        if (password !== confirmPassword) {
            console.error("Passwords don't match!");
	    setError(true);
            return;
        }

        // Handle registration logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    Job Seeker Register
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
    );
}

export default Register;
