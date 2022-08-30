const User = require('../models/User')

module.exports = (req, res) => {
    const { username, password } = req.body
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            if (username === user.username){
                req.session.userId = user._id
                return res.redirect('/')
            } else {
                return res.redirect('/auth/login')
            }
        } else {
            res.redirect('/auth/login')
        }
    })
}