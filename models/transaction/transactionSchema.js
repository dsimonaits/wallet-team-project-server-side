const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  type: {
    type: Boolean,
    required: [true, "Type is required"],
  },
  sum: {
    type: Number,
    required: [true, "Sum is required"],
  },
  category: {
    type: String,
    enum: [
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
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  comment: {
    type: String,
    default: "",
  },
  owner: {
    type: Object,
    ref: "user",
    required: true,
  },
});

const TransactionSchema = mongoose.model("Transaction", transactionSchema);
module.exports = TransactionSchema;
