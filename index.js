const express = require('express')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
const expressSession = require('express-session')


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw())

const fileUpload = require('express-fileupload')
app.use(fileUpload())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const getAboutController = require('./controllers/getAbout')
const getContactController = require('./controllers/getContact')
const getSamplePostController = require('./controllers/getSamplePost')
const validateMiddleWare = require('./middleware/validationMiddleware')
const newUserController = require('./controllers/newUser')
const storeUsercontroller = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const authMiddleware = require('./middleware/authMiddleware')
const redirectMiddleware = require('./middleware/redirectMiddleware')
app.use(expressSession({
    secret: 'keyboard cat'
}))

app.use(express.static('public'))

app.listen(4000, () => {
    console.log('App listen on port 4000')
})

global.loggedIn = null
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})

app.use('/posts/store', validateMiddleWare)

app.get('/', homeController)

app.get('/about', getAboutController)

app.get('/contact', getContactController)

app.get('/post', getSamplePostController)

app.get('/post/:id', getPostController)

app.get('/posts/new',authMiddleware, newPostController)

app.post('/posts/store',authMiddleware, storePostController)

app.get('/auth/register', redirectMiddleware, newUserController)

app.post('/users/store', redirectMiddleware, storeUsercontroller)

app.get('/auth/login', redirectMiddleware, loginController)

app.post('/users/login', redirectMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => {
    res.render('notfound')
})