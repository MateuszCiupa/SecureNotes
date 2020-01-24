import React from 'react';
import useStyles from 'assets/useStyles';
import { Card, CardContent, Typography } from '@material-ui/core';

export default ({ title, firstname, lastname, content, date }) => {
    const classes = useStyles();

    return (
        <Card className={classes.post_card}>
            <CardContent>
                <Typography className={classes.post_title} color="textSecondary" gutterBottom>
                    {firstname + ' ' + lastname}
                </Typography>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" component="p">
                    {content}
                </Typography>
                <Typography variant="body2" component="h2" color="textSecondary">
                    {date}
                </Typography>
            </CardContent>
        </Card>
    );
};