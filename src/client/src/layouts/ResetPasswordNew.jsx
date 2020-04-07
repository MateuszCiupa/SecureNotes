import React, { useState } from 'react';
import { Paper, TextField, Typography, Button } from '@material-ui/core';
import useStyles from 'assets/useStyles';
import { validatePassword } from '../assets/validateInput';

export default ({ match: { params: { userId, token } } }) => {
    const classes = useStyles();

    const [password, setPassword] = useState('');
    const [passErr, setPassErr] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        if (validatePassword(password) && !passErr) {
            const response = await fetch(`/api/email/reset/password/${userId}/${token}`, {
                method: 'PATCH',
                body: JSON.stringify({ password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
        } else {

        }        
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Reset password
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    className={classes.text_field}
                    type="password"
                    required
                    label="New password"
                    margin="normal"
                    autoFocus
                    onChange={e => setPassword(e.target.value)}
                />

                <TextField
                    className={classes.text_field}
                    type="password"
                    required
                    label="Repeat password"
                    margin="normal"
                    autoFocus
                    error={passErr}
                    helperText={passErr ? 'Passwords should be the same!' : ''}
                    onChange={e => {
                        if (e.target.value !== password) setPassErr(true);
                        else setPassErr(false);
                    }}
                />
                
                <div className={classes.weird_buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Change password
                    </Button>
                </div>
            </form>
        </Paper>
    );
};
