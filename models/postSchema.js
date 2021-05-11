const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: Number, required: true },
    likes: { type: Number, default: 0},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: '' }],
    // category: { type: String, required: true },
    slug: { type: String, slug: "title", unique: true }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema);