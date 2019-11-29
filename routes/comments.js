const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

function comentsRoute(app) {
    app
        .get('/api/posts/comments', (req, res) => {
            Comment
                .find({})
                .then(list => res.json(list).end())
        })
        .post('/api/posts/comments', (req, res) => {
            const post = new Post(req.body);
            post.save()
                .then(post => res.json(post).end())
                .catch((err) => {
                    console.error(err);
                    res.status(400).end()})
        })
        .delete('/api/posts/comments/:commentID', (req, res) => {
            Comment.findById(req.params.commentID)
                .then(post => post.remove())
                .then(post => res.json(post).end())
                .catch((err) => {
                    console.error(err);
                    res.status(400).end()})
        })
        .put('/api/posts/:postID', (req, res) => {
            Comment.findById(req.params.postID)
                .then(post => Object.assign(post, req.body))
                .then(post => post.save())
                .then(post => res.json(post).end())
                .catch((err) => {
                    console.error(err);
                    res.status(400).end()}) // res.status(400).json({message:'failed to update'}).end()
        });
}
module.exports = comentsRoute;