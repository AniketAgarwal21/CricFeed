const posts = require("../controllers/posts")()

const initRoutes = (app) => {

    app.get('/', posts.getHome)
    app.get('/posts/:slug', posts.getPost)
    app.get('/create-post', posts.createPost)
    app.post('/add-post', posts.addPost)
    // app.post('/like-post', posts.likePost)

}

module.exports = initRoutes
