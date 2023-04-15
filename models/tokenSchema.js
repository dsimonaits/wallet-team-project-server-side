const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const TokenSchema = mongoose.model("Token", tokenSchema);
module.exports = TokenSchema;
