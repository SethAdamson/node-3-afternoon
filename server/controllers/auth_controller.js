const users = require('../models/users');
let id = 1;

module.exports = {
    login: (req, res, next) => {
        let {username, password} = req.body;
        let copy = users.find(users => users.password === password && users.username === username)
        
        if(copy) {
            req.session.user.username = username
            res.status(200).send(req.session.user);
        } else {
            res.status(500).send('Unauthorized');
        }
    },

    register: (req, res, next) => {
        let {username, password} = req.body;
        users.push({id, username, password});
        id++;
        req.session.user.username = username;
        res.status(200).send(req.session.user);
    },

    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session);
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    },
}