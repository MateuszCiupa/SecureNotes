import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import useStyles from 'assets/useStyles';
import { connect } from 'react-redux';
import { login } from 'redux/modules/session';
import { clearErrors } from 'redux/modules/error';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ error }) => ({ 
    error
});

const mapDispatchToProps = dispatch => ({ 
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
});

const Login = ({ error, login, clearErrors }) => {
    useEffect(() => {
        clearErrors();
    }, [clearErrors]);

    const classes = useStyles();
    const [loginValue, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleReset = () => {
        setLogin('');
        setPassword('');
    };

    const handleSubmit = event => {
        event.preventDefault();
        login({ 
            login: loginValue, 
            password 
        });
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit} >
                <TextField
                    className={classes.text_field}
                    required
                    fullWidth
                    label="Login"
                    name="login"
                    margin="normal"
                    autoFocus
                    onChange={e => setLogin(e.target.value)}
                />

                <TextField
                    className={classes.text_field}
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    margin="normal"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    helperText={error}
                />

                <Link to='/reset/password'>
                    <Typography color="primary" variant="subtitle2">
                        Forgot password?
                    </Typography>
                </Link>

                <div className={classes.weird_buttons}>
                    <Button
                        onClick={handleReset}
                    >
                        Reset
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Paper>
    );
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Login);