const mongoose = require("mongoose");
const {Schema} = mongoose;

// Dinh nghia cau truc du lieu cua doi tuong User
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique value."]
    },
    password: String,
    role: String,
    dob: Date
}, {
    timestamps: true
});

// Sinh model tu cau truc du lieu o tren
const User = mongoose.model("user", userSchema);

// Export model de su dung
module.exports = User;