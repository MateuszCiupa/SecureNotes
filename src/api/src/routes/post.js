import express from 'express';
import Post from '../models/Post';
import validatePost from '../models/validatePost';

const postRouter = express.Router();

postRouter.post('', async (req, res) => {
    const user = req.session.user;
    if (!user) return res.sendStatus(401);

    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const { shared, title, content } = req.body;
    
    const post = { 
        shared, 
        firstname: user.firstname, 
        lastname: user.lastname, 
        userId: user.userId, 
        title, 
        content 
    };

    try {
        const savedPost = await new Post(post).save();
        res.status(201).send(savedPost);
    } catch(err) {
        res.status(500).send(err);
    }
});

postRouter.get('', async (req, res) => {
    const user = req.session.user;
    if (!user) return res.sendStatus(401);
    
    try {
        const publicPosts = await Post.find({ shared: true, userId: { $ne: user.userId } });
        const userPosts = await Post.find({ userId: user.userId });
        return res.status(200).send([...userPosts, ...publicPosts]);
    } catch(err) {
        return res.status(500).send(err);
    }
});

export default postRouter;