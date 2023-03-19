const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Password is required"],
  },
  expired: {
    type: boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const verification = mongoose.model("verification", verificationSchema);

module.exports = verification;
