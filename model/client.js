const mongoose = require('mongoose');
const { Schema } = mongoose

const taskSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true }
})

const client_data = mongoose.model('client_data',taskSchema)

module.exports = client_data;