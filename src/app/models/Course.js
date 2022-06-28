const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Course = new Schema({
    _id: { type: Number },
    name: { type: String, maxlength: 100, required: true },
    description: { type: String, required: true },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String, required: true },
    level: { type: String, required: true },
}, {
    timestamps: true,
    _id: false
});


// add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

Course.plugin(AutoIncrement)

module.exports = mongoose.model('Course', Course)