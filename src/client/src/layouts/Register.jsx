import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import useStyles from 'assets/useStyles';
import { connect } from 'react-redux';
import { register } from 'redux/modules/session';
import { clearErrors, receiveErrors } from 'redux/modules/error';
import { 
    passEntropy, 
    colorByEntropy, 
    validateLogin, 
    validateName, 
    validatePassword,
    validateEmail, 
    actualPassEntropy
} from 'assets/validateInput';

const mapStateToProps = ({ error, session }) => ({ 
    error
});

const mapDispatchToProps = dispatch => ({ 
    register: user => dispatch(register(user)),
    clearErrors: () => dispatch(clearErrors()),
    receiveErrors: message => dispatch(receiveErrors({ message }))
});

const Register = ({ error, register, clearErrors, receiveErrors }) => {
    useEffect(() => {
        if (error) setOpen(true);
    }, [error]);

    useEffect(() => {
        setOpen(false);
        clearErrors();
    }, [clearErrors]);

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [passScore, setPassScore] = useState(0);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [passErr, setPassErr] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        
        if (
            validateName(firstname) && 
            validateName(lastname) && 
            validateLogin(login) && 
            validatePassword(password) && 
            validateEmail(email) &&
            !passErr
        ) {
            register({ firstname, lastname, login, password, email });
        } else {
            receiveErrors('Correct your input.');
            setOpen(true);
        }
    };

    const handleReset = () => {
        clearErrors();
        setPassScore(0);
        setRepeatPass('');
        setPassErr(false);
        setFirstname('');
        setLastname('');
        setLogin('');
        setPassword('');
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Sign Up
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
                    helperText="Possible characters: A-Z, a-z or 0-9, min 4 and max 20 characters long."
                    onChange={e => setLogin(e.target.value)}
                />

                <TextField
                    required
                    className={classes.text_field}
                    value={password}
                    label="Password"
                    margin="normal"
                    type="password"
                    helperText="Min 8 and max 1024 characters long."
                    onChange={e => {
                        setPassword(e.target.value)
                        setPassScore(passEntropy(e.target.value))
                    }}
                />

                <div
                    style={{ height: '30px' }}
                >
                    <progress
                        style={{ width: '100%' }}
                        className={`password-strength-meter-progress strength-${colorByEntropy(passScore)}`}
                        value={passScore}
                        max={1} 
                    />

                    <Typography variant="subtitle2" >
                        {password && (
                            <>
                                <strong>Characters diversity:</strong> {colorByEntropy(passScore)}
                                &nbsp; &nbsp; &nbsp;
                                <strong>Bits of entropy (password strength):</strong> {actualPassEntropy(password)}
                            </>
                        )}
                    </Typography>
                </div>

                <TextField
                    required
                    className={classes.text_field}
                    value={repeatPass}
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
                    helperText="Min 4 and max 256 characters long."
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