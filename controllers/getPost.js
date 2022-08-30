const BlogPost = require('../models/BlogPost.js')
module.exports = (req, res) => {
    BlogPost.findById(req.params.id, function(err, detailPost){
        res.render('post', {
            detailPost
        })
    })
}