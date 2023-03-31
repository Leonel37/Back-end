const mongoose = require("mongoose");


const UsersEsquema = new mongoose.Schema({

 id: {
   type: Number,
   required: true,
 },
 name: {
   type: String,
 },
 password: {
    type: String,
  },
 
});


module.exports = mongoose.model("Users", UsersEsquema);