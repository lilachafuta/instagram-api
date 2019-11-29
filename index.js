const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


require('./models');

const app = express();
const port = 4000;
app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    const User = mongoose.model('User');

    User.findOne({
        user: req.headers.user,
        password: req.headers.password
    })
        .then(user => req.user = user)
        .then(() => next())
        .catch(() => res.status(400).end());
});

require('./routes/users')(app); // same like: const usersRoutes = require('./routes/users'); usersRoutes(app);
require('./routes/posts')(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));


// without mongoose:

// const {connect} = require('./models');
//
// connect().then(db => {
//     console.log('db is connected');
//
//     const app = express();
//     const port = 3000;
//
//     app.use(morgan('combined'));
//     app.use(cors());
//     app.use(bodyParser.json());
//
//     app.get('/api/users', (req, res) => {
//         db.collection('users')
//             .find({})
//             .toArray()
//             .then(list => res.json(list).end())
//     });
//     app.get('/api/users/:name', (req, res) => {
//         db.collection('users')
//             .find({name: req.params.name})
//             .toArray()
//             .then(list => res.json(list).end())
//     });
//     app.post('/api/users', (req, res) => {
//         db.collection('users')
//             .insertOne({name: req.body.name,
//                 username: req.body.username,
//                 password: req.body.password,
//                 birthDate: req.body.birthDate,
//                 gender: req.body.gender,
//                 githubLink: req.body.githubLink,
//                 about: req.body.about
//             })
//             .then(list => res.json(list).end())
//     });
//
//
//     app.listen(port, () => console.log(`App listening on port ${port}!`));
// });
