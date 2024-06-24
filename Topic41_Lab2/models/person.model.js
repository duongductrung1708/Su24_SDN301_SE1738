const mongoose = require("mongoose");
const {Schema} = mongoose;

const personSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    dob: {
        type: Date,
        required: [true, "Dob is required"]
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "blog"
        }
    ]
},{
    timestamps: true
});

const Person = mongoose.model("person", personSchema);
module.exports = Person;