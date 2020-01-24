import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import useStyles from 'assets/useStyles';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/session';

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const Profile = ({ logout, history }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} square>
            <Typography variant="h2" align="center">
                Profile page
            </Typography>

            <div className={classes.weird_buttons}>
                <Button 
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={logout}
                >
                    Sign out
                </Button>
                <Button 
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => history.push('/change/password')}
                >
                    Change password
                </Button>
            </div>
        </Paper>
    );
};

export default connect(
    null, 
    mapDispatchToProps
)(Profile);