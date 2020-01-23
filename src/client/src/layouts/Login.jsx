import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import useStyles from 'assets/useStyles';
import { connect } from 'react-redux';
import { login } from 'redux/modules/session';
import { receiveErrors, clearErrors } from 'redux/modules/error';
import { Link } from 'react-router-dom';
import { validateLogin, validatePassword } from 'assets/validateInput';

const mapStateToProps = ({ error }) => ({ 
    error
});

const mapDispatchToProps = dispatch => ({ 
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    receiveErrors: message => dispatch(receiveErrors({ message }))
});

const Login = ({ error, login, receiveErrors, clearErrors }) => {
    useEffect(() => {
        if (error) setOpen(true);
    }, [error]);

    useEffect(() => {
        setOpen(false);
        clearErrors();
    }, [clearErrors]);

    const classes = useStyles();
    const [loginValue, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const handleReset = () => {
        setLogin('');
        setPassword('');
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (validateLogin(loginValue) && validatePassword(password)) {
            login({ 
                login: loginValue, 
                password 
            });
        } else {
            receiveErrors('Correct login or password');
            setOpen(true);
        }
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>

            <Collapse in={open} style={{ position: 'absolute', right: 20, width: 'auto' }}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    } 
                >
                    {error}
                </Alert>
            </Collapse>

            <form className={classes.form} onSubmit={handleSubmit} >
                <TextField
                    className={classes.text_field}
                    required
                    label="Login"
                    margin="normal"
                    autoFocus
                    onChange={e => setLogin(e.target.value)}
                />

                <TextField
                    className={classes.text_field}
                    required
                    label="Password"
                    margin="normal"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
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