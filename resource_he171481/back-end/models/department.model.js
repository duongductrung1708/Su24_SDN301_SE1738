const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;
