const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const schema = new Schema({
    name: String,
    email: String,
    description: String,
    userId: Schema.Types.ObjectId
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

const Contact = mongoose.model("contact", schema);
module.exports = Contact;