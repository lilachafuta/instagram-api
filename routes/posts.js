const mongoose = require('mongoose');
const Post = mongoose.model('Post');

function postsRoutes(app) {
    app
        .get('/api/posts', (req, res) => {
            Post
                .find({})
                .sort('-created')
                .limit(Number(req.query.limit || 20))
                .offset(Number(req.query.offset || 0))
                .then(list => res.json(list).end())
        })
        .post('/api/posts', (req, res) => {
            const post = new Post(req.body);
            post.save()
                .then(post => res.json(post).end())
                .catch((err) => {
                    console.error(err);
                    res.status(400).end()})
        })
        .get('/api/posts/:postID', (req, res) => {
            Post.findById(req.params.postID)
                .then(post => res.json(post).end())
                .catch((err) => {
                    console.error(err);
                    res.status(400).end()})
        })
        .delete('/api/posts/:postID', (req, res) => {
            Post.findById(req.params.postID)
                .then(post => post.remove())
                .then(post => res.json(post).end())
                .catch((err) => {
                    console.error(err);
                    res.status(400).end()})
        })
        .put('/api/posts/:postID', (req, res) => {
            Post.findById(req.params.postID)
                .then(post => Object.assign(post, req.body))
                .then(post => post.save())
                .then(post => res.json(post).end())
                .catch((err) => {
                    console.error(err);
                    res.status(400).end()}) // res.status(400).json({message:'failed to update'}).end()
        });
}
module.exports = postsRoutes;