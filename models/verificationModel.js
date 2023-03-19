const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  verificationToken: {
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

const Verification = mongoose.model("verification", verificationSchema);

module.exports = Verification;
