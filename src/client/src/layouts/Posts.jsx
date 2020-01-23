import React from 'react';
import useStyles from 'assets/useStyles';
import { Paper, Typography } from '@material-ui/core';

export default () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} square>
            <Typography variant="h2" align="center">
                Yet another home page page
            </Typography>
        </Paper>
    );
};