import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useStyles from 'assets/useStyles';
import { connect } from 'react-redux';
import { register } from 'redux/modules/session';
import { clearErrors } from 'redux/modules/error';
import { passEntropy } from 'assets/validateInput';

const mapStateToProps = ({ error, session }) => ({ 
    error,
    session
});

const mapDispatchToProps = dispatch => ({ 
    register: user => dispatch(register(user)),
    clearErrors: () => dispatch(clearErrors())
});

const Register = ({ error, register, clearErrors, session, history }) => {
    useEffect(() => {
        clearErrors();
    }, [clearErrors]);

    useEffect(() => {
        if (session.user) history.push('/login');
    }, [session.user, history]);

    const classes = useStyles();

    const [passScore, setPassScore] = useState(0);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [passErr, setPassErr] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        register({
            firstname,
            lastname,
            login,
            password,
            email
        });
    };

    const handleReset = () => {
        clearErrors();
        setFirstname('');
        setLastname('');
        setLogin('');
        setPassword('');
        setEmail('');
        setRepeatPass({
            value: '',
            error: false,
            helperText: ''
        });
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>

            <Collapse in>
            </Collapse>
            <Alert onClose={() => {}}>Hejooo</Alert>

            <form className={classes.form}>
                <TextField
                    required
                    className={classes.text_field}
                    value={firstname}
                    label="First name"
                    margin="normal"
                    autoFocus
                    onChange={e => setFirstname(e.target.value)}
                />

                <TextField
                    required
                    className={classes.text_field}
                    value={lastname}
                    label="Last name"
                    margin="normal"
                    onChange={e => setLastname(e.target.value)}
                />

                <TextField
                    required
                    className={classes.text_field}
                    value={login}
                    label="Login"
                    margin="normal"
                    onChange={e => setLogin(e.target.value)}
                    helperText=""
                />

                <TextField
                    required
                    className={classes.text_field}
                    value={password}
                    label="Password"
                    margin="normal"
                    type="password"
                    onChange={e => {
                        setPassword(e.target.value)
                        setPassScore(passEntropy(e.target.value))
                    }}
                />

                <progress
                    className={`password-strength-meter-progr`}
                    value={passScore}
                    max={1} 
                />

                <Typography variant="subtitle1" >
                    {password && (
                        <>
                            <strong>Password strength:</strong>

                        </>
                    )}
                </Typography>

                <TextField
                    required
                    className={classes.text_field}
                    value={repeatPass.value}
                    label="Repeat password"
                    margin="normal"
                    type="password"
                    helperText={passErr ? 'Passwords are not the same!' : ''}
                    error={passErr}
                    onChange={e => {
                        setRepeatPass(e.target.value)
                        if (e.target.value !== password) setPassErr(true)
                        else setPassErr(false)
                    }}
                />

                <TextField
                    required
                    className={classes.text_field}
                    value={email}
                    label="Email"
                    margin="normal"
                    type="email"
                    helperText={error}
                    onChange={e => setEmail(e.target.value)}
                />

                <div className={classes.weird_buttons}>
                    <Button
                        onClick={handleReset}
                    >
                        Reset
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Paper>
    );
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Register);