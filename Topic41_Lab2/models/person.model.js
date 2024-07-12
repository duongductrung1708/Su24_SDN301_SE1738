const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "blog",
        validate: {
          validator: async function (blogId) {
            const person = await mongoose.model("person").findOne({
              blogs: blogId,
              _id: { $ne: this._id },
            });
            return !person;
          },
          message: "This blog is already associated with another person",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model("person", personSchema);
module.exports = Person;
