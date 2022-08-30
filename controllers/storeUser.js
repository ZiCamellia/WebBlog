const User = require('../models/User.js')
module.exports = (req, res) => {
    User.create(req.body, function(err, user) {
        if (err) {
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}