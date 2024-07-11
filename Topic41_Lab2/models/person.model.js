const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model("person", personSchema);
module.exports = Person;
