const mongoose = require('mongoose');


let jobSchema = mongoose.Schema({
    id: Number,
    company: String,
    link: String,
    notes: String,
    createTime: Date
});

module.exports = mongoose.model('Job', jobSchema);
