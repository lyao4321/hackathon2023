import * as React from 'react';
import { Avatar, Typography, Grid, Paper, Button, TextField, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


interface UserProfileProps {
    user: {
        username: string;
        email: string;
        avatarUrl: string;
    };
}

const UserProfile: React.FC<UserProfileProps> = ({}) => {
    const [editingField, setEditingField] = React.useState<string | null>(null);
    const [editValue, setEditValue] = React.useState<string>("");
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        avatarUrl: '',
        profile : {
            age: 0,
            gender: '',
            location: '',
            industry: '',
            interests: '',
            startupExperience: '',
            university: '',
            hours: 0,
            skills: ''
        }});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/userprofile', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    
    const handleEdit = (label: string, value: string) => {
        setEditingField(label);
        setEditValue(value);
    };

    const handleConfirm = async (label: string) => {
        // Define the endpoint
        const endpoint = 'http://localhost:8080/api/updateprofile';  // replace with your endpoint
        try {
            // Make the POST request
            const response = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    field: label,           // The field being updated (e.g., "Gender", "Age", ...)
                    value: editValue,       // The new value for that field
                }),
            });
    
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Handle the response (if you expect a JSON response, for example)
            const data = await response.json();
            console.log(data);
    
            // Assuming the save was successful, reset the editing state
            setEditingField(null);
    
        } catch (error) {
            console.log(`There was a problem with the fetch operation for ${label}: `, error);
        }
    };
    

    const handleCancel = () => {
        setEditingField(null);
    };

    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <Avatar src={user.avatarUrl} alt={user.username} style={{ width: '100px', height: '100px' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h5">{user.username}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">{user.email}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Edit Profile
                    </Button>
                </Grid>
                {[	
                    ['Age', user.profile.age],
		    ['Gender', user.profile.gender],
                    ['Location', user.profile.location],
                    ['Industry', user.profile.industry],
                    ['Interests', user.profile.interests],
                    ['Startup Experience', user.profile.startupExperience],
                    ['University', user.profile.university],
                    ['Hours', user.profile.hours],
                    ['Skills', user.profile.skills]
                ].map(([label, value]) => (
                    <Grid 
                        item 
                        container 
                        key={label} 
                        direction="row" 
                        justifyContent="center" 
                        alignItems="center" 
                        spacing={2} 
                        style={{ maxWidth: '400px' }}
                    >
                        <Grid item xs>
                            {editingField === label ? (
                                <TextField 
                                    value={editValue} 
                                    onChange={(e) => setEditValue(e.target.value)} 
                                />
                            ) : (
                                <Typography variant="body1" noWrap>{`${label}: ${value}`}</Typography>
                            )}
                        </Grid>
                        <Grid item>
                            {editingField === label ? (
                                <>
                                    <IconButton onClick={() => handleConfirm(label)}>
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton onClick={handleCancel}>
                                        <CloseIcon />
                                    </IconButton>
                                </>
                            ) : (
                            <Button size="small" onClick={() => handleEdit(String(label), String(value))}>Edit</Button>
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}


export default UserProfile;
