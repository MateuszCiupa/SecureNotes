import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import useStyles from 'assets/useStyles';
import { Link } from 'react-router-dom';
import { logout } from 'redux/modules/session';

const mapStateToProps = ({ session }) => ({ 
    session 
});

const mapDispatchToProps = dispatch => ({ 
    logout: () => dispatch(logout()) 
});

const LoginHeader = ({ session, logout }) => {
    const classes = useStyles();
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    className={classes.title}
                >
                    Hi, {session.firstname}!
                </Typography>

                <Link to='/'>
                    <Button
                        className={classes.button} 
                        color="inherit"
                    >
                        Home
                    </Button>
                </Link>

                <Link to='/post'>
                    <Button
                        className={classes.button} 
                        color="inherit"
                    >
                        Post
                    </Button>
                </Link>

                <Link to='/profile'>
                    <Button
                        className={classes.button} 
                        variant="contained"
                    >
                        Profile
                    </Button>
                </Link>

            </Toolbar>
        </AppBar>
    )
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(LoginHeader);