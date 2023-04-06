const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text is required"],
  },
});

const Test = mongoose.model("test", testSchema);

module.exports = Test;
