const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
 
user:{
    type: Schema.Types.ObjectId, 
    ref:"user"
},
  refreshToken:{
        type:String,
        required:true
  },
  createdAt:{
    type:Date,
    default:Date.now()
 }
});
   
  const TokenSchema = mongoose.model("Token", tokenSchema);
  module.exports = TokenSchema;