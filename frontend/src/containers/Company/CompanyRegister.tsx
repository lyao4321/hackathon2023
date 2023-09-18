import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
    TextField,
    Typography,
    CssBaseline,
    Link,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RegisterBar from '../RegisterBar';
import Autocomplete from '@mui/material/Autocomplete';


function CompanyRegister(): React.ReactElement {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [company, setCompany] =  useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error , setError] = useState<boolean>(false);
    const [companies, setCompanies] = useState<any[]>([]); 

    const [isAddCompanyDialogOpen, setAddCompanyDialogOpen] = useState(false);
    const [newCompany, setNewCompany] = useState({
        name: '',
        industry: '',
        location: '',
        description: ''
    });

    useEffect(() => {
        // Function to fetch companies
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/getCompanies', {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status !== 200) {
                    console.error('Failed to fetch companies');
                    return;
                }
                else {
                    console.error('200 response')
                }
                const data = await response.json();
                setCompanies(data.data);  // Assuming the API returns an array of strings
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

     // Function to open the Add Company dialog
     const openAddCompanyDialog = () => {
        setAddCompanyDialogOpen(true);
    };

    // Function to close the Add Company dialog
    const closeAddCompanyDialog = () => {
        setAddCompanyDialogOpen(false);
    };

    const handleNewCompanyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCompany(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle adding a new company (you can adjust the logic as needed)
    const handleAddCompany = async () => {
        // Prepare the data to be sent to the server
        const companyData = {
            name: newCompany.name,
            industry: newCompany.industry,
            location: newCompany.location,
            description: newCompany.description
        };
        
    
        try {
            const response = await fetch('http://localhost:8080/api/addCompanies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companyData)
            });
    
            const responseData = await response.json();
            
            if (response.status === 200) {
                console.log('Company added successfully:', responseData);
                closeAddCompanyDialog();
                setNewCompany({
                    name: '',
                    industry: '',
                    location: '',
                    description: ''
                });
            } else {
                console.error('Failed to add company:', responseData.error);
            }
        } catch (error) {
            console.error('Error while adding company:', error);
        }
    };


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
                navigate('/company/form');
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
            options={[...companies.map(company => company.name), 'Add New Company']}
            getOptionLabel={(option: string) => option}
            value={company}
            onChange={(_, newValue: string | null) => {
                if (newValue === 'Add New Company') {
                    openAddCompanyDialog();
                } else {
                    setCompany(newValue || '');
                }
            }}
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

        {/* Add Company Dialog */}
        <Dialog open={isAddCompanyDialogOpen} onClose={closeAddCompanyDialog}>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the details of the new company.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Company Name"
                    fullWidth
                    value={newCompany.name}
                    onChange={handleNewCompanyInputChange}
                />
                <TextField
                    margin="dense"
                    name="industry"
                    label="Industry"
                    fullWidth
                    value={newCompany.industry}
                    onChange={handleNewCompanyInputChange}
                />
                <TextField
                    margin="dense"
                    name="location"
                    label="Location"
                    fullWidth
                    value={newCompany.location}
                    onChange={handleNewCompanyInputChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    fullWidth
                    value={newCompany.description}
                    onChange={handleNewCompanyInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAddCompanyDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddCompany} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        

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
