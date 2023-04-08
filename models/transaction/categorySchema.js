const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: {
    type: Array,
    default: [
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Child care",
      "Household products",
      "Education",
      "Leisure",
      "Other",
    ],
  },
});

const CategorySchema = mongoose.model("Category", categorySchema);
module.exports = CategorySchema;
