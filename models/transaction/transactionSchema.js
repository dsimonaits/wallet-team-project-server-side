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
    default: function () {
      if (this.name === "") {
        return "Unknown";
      } else {
        return this.name;
      }
    },
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  comment: {
    type: String,
    default: function () {
      if (this.name === "") {
        return "Unknown";
      } else {
        return this.name;
      }
    },
  },

  //   month: {
  //     type: Number,
  //   },
  //   year: {
  //     type: Number,
  //   },
  owner: {
    type: Object,
    ref: "user",
    required: true,
  },
});

// transactionSchema.pre("save", function (next) {
//   this.month = this.date.getMonth() + 1;
//   this.year = this.date.getFullYear();
//   next();
// });

const TransactionSchema = mongoose.model("Transaction", transactionSchema);
module.exports = TransactionSchema;
