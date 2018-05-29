const swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        let {category} = req.query;
        if(category){
            const filtered = swag.filter(e => e.category === category);
            res.status(200).send(filtered)
        }
        res.status(200).send(swag);
    }
}