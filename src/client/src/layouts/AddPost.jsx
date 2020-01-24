import React, { useState } from 'react';
import { Paper, Typography, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import useStyles from 'assets/useStyles';
import { connect } from 'react-redux';
import { addPost } from 'redux/modules/posts';

const mapDispatchToProps = dispatch => ({
    addPost: post => dispatch(addPost(post))
});

const AddPost = ({ addPost, history }) => {
    const classes = useStyles();

    const [shared, setShared] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        addPost({
            shared,
            title,
            content
        });
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Add post
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    className={classes.text_field}
                    required
                    label="Title"
                    margin="normal"
                    autoFocus
                    onChange={e => setTitle(e.target.value)}
                />

                <TextField
                    className={classes.text_field}
                    required
                    label="Content"
                    margin="normal"
                    multiline
                    onChange={e => setContent(e.target.value)}
                />

                <FormControlLabel 
                    control={(
                        <Checkbox 
                            checked={shared}
                            color="primary"
                            onChange={() => setShared(prev => !prev)}
                        />
                    )}
                    label="Shared"
                />

                <div className={classes.weird_buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Post
                    </Button>
                </div>
            </form>
        </Paper>
    );
};

export default connect(
    null,
    mapDispatchToProps
)(AddPost);