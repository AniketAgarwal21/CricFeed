const Posts = require("../models/postSchema")


const posts = () => {
    return ({
        getHome(req, res) {
            Posts.find({}).sort({ createdAt: -1 }).exec((err, posts) => {
                // console.log(posts);
                if (err) return res.render('500', { err })
                if (!posts) return res.render('404')

                let popularPosts = [...posts].sort((a, b) => {
                    if (a.likes < b.likes) return 1
                    if (a.likes > b.likes) return -1
                    return 0
                })
                popularPosts = popularPosts.slice(0, 6)
                let recentPosts = posts.slice(0, 3)
                // console.log(popularPosts);
                // console.log(posts);
                return res.render('home', { recentPosts, popularPosts })
            })
        },
        getPost(req, res) {
            const slug = req.params.slug
            Posts.findOne({ slug }, async (err, post) => {
                // console.log(post);
                if (err) return res.render('500', { err })
                if (!post) return res.render('404')
                const posts = await Posts.find({})
                let popularPosts = posts.sort((a, b) => {
                    if (a.likes < b.likes) return 1
                    if (a.likes > b.likes) return -1
                    return 0
                })
                popularPosts = popularPosts.slice(0, 2)

                return res.render('post', { post, popularPosts })
            })
        },
        createPost(req, res) {
            return res.render('createPost')
        },
        addPost(req, res) {
            const { key, title, body, author, image } = req.body
            // console.log(req.body);

            if (key !== process.env.CREATE_POST_ID) {
                return res.render('createPost', { error: "Something Went Wrong" })
            }

            const readTime = Math.ceil(body.split(" ").length / 200)

            const post = new Posts({
                title,
                body,
                author,
                readTime,
                image
            })

            post.save().then(() => {
                res.render('createPost', { success: "Post Added" })
            }).catch((error) => res.render('createPost', { error }))
        },
        // async likePost(req, res) {
        //     const { slug } = req.body

        //     Posts.findOneAndUpdate({ slug }, {$inc: { likes: 1 }}, {new: true}, (err, doc) => {
        //         console.log(doc);
        //     })

        // }

    })
}

module.exports = posts