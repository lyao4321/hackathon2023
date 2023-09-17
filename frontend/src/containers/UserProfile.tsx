import * as React from 'react';
import { Avatar, Typography, Grid, Paper, Button } from '@mui/material';

interface UserProfileProps {
    user: {
        username: string;
        email: string;
        avatarUrl: string;
    };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
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
            </Grid>
        </Paper>
    );
}

export default UserProfile;
