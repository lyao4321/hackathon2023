import React, { useState } from 'react';
import {
    Link,
    Button,
    Container,
    TextField,
    Typography,
    CssBaseline,
} from '@mui/material';
import '../styles/companyLogin.css';


function CompanyLogin(): React.ReactElement {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Container component="main" maxWidth="lg">
        
        <div className='grid-container'>
            <div className='container1'>
                <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
                        Company Login
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
                        Don't have a company account? <Link href="/company/register" variant="body2">Click here to register</Link>
                    </Typography>
                </div>
            </div>

            <div className='container2'>
                <p>Make <b>Data-Driven</b> Hiring <b>Decisions</b></p>
            </div>

        </div>
        </Container>
    );
}

export default CompanyLogin;
