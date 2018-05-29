const swag = require('../models/swag');

module.exports = {
    add: (req, res, next)  => {
        const {id} = req.query;
        let {cart} = req.session.user;
        let idx = cart.findIndex(item => item.id == id);

        if(idx === -1){
            const item = swag.find(swag => swag.id == id);
            cart.push(item);
            req.session.user.total += item.price;
        }
            res.status(200).send(req.session.user);        
    },

    delete: (req, res, next)  => {
        const {id} = req.query;
        let {cart} = req.session.user

        const removal = cart.find(item => item.id == id);
        if(removal) {
            const i = cart.findIndex(item => item.id == id);
            cart.splice(i, 1);
            req.session.user.total -= removal.price;
        }
    res.status(200).send(req.session.user);    
    },

    checkout: (req, res, next)  => {
        const {user} = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user);
    },
}