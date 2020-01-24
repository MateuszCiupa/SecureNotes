import React, { useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import useStyles from 'assets/useStyles';
import { Post } from './components';
import { connect} from 'react-redux';
import { getPosts } from 'redux/modules/posts';

const mapStateToProps = ({ posts }) => ({
    posts
});

const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});

const Home = ({ getPosts, posts }) => {
    useEffect(() => {
        if (posts.length === 0) {
            getPosts();
        }
    }, [posts, getPosts]);

    return (
        <Paper className={useStyles().paper} square>
            <Typography component="h1" variant="h5">
                    Posts
            </Typography>
            {posts.map((post, idx) => (
                <Post
                    key={idx}
                    firstname={post.firstname}
                    lastname={post.lastname}
                    title={post.title}
                    content={post.content}
                    date={post.date}
                />
            ))}
        </Paper>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
