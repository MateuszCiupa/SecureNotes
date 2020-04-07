import React, { useState, useEffect } from 'react';
import { 
    Paper, 
    Typography, 
    Button, 
    TextField, 
    Checkbox, 
    FormControlLabel, 
    Collapse, 
    IconButton 
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import useStyles from 'assets/useStyles';
import { connect } from 'react-redux';
import { addPost } from 'redux/modules/posts';
import { validateContent, validateTitle } from '../assets/validateInput';
import { receiveErrors } from 'redux/modules/error';

const mapDispatchToProps = dispatch => ({
    addPost: post => dispatch(addPost(post)),
    receiveErrors: message => dispatch(receiveErrors({ message }))
});

const mapStateToProps = ({ error }) => ({
    error
});

const AddPost = ({ addPost, error, receiveErrors }) => {
    const classes = useStyles();

    const [shared, setShared] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error) setOpen(true);
    }, [error]);

    const handleSubmit = event => {
        event.preventDefault();
        if (validateTitle(title) && validateContent(content)) {
            addPost({ shared, title, content });
        } else {
            receiveErrors('Correct your input.');
        }
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Add post
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

            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    className={classes.text_field}
                    required
                    label="Title"
                    margin="normal"
                    autoFocus
                    onChange={e => setTitle(e.target.value)}
                    helperText="Min 2 and max 100 characters long."
                />

                <TextField
                    className={classes.text_field}
                    required
                    label="Content"
                    margin="normal"
                    multiline
                    onChange={e => setContent(e.target.value)}
                    helperText={`${content.length} / 2048`}
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
    mapStateToProps,
    mapDispatchToProps
)(AddPost);