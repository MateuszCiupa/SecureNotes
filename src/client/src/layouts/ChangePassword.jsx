import React, { useState } from 'react';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import useStyles from 'assets/useStyles';

export default () => {
    const classes = useStyles();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        if (newPassword === repeatPass) {
            const response = await fetch('/api/user/pass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,
                    newPassword
                })
            });
            if (response.ok) console.log('password changed');
        }
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Change password
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    className={classes.text_field}
                    required
                    label="Old password"
                    margin="normal"
                    autoFocus
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />

                <TextField
                    className={classes.text_field}
                    required
                    label="New password"
                    margin="normal"
                    type="password"
                    onChange={e => setNewPassword(e.target.value)}
                />

                <TextField
                    className={classes.text_field}
                    required
                    label="Confirm new password"
                    margin="normal"
                    type="password"
                    onChange={e => setRepeatPass(e.target.value)}
                />
                
                <div className={classes.weird_buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Update password
                    </Button>
                </div>
            </form>
        </Paper>
    );
};