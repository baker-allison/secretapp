require ('dotenv').config();
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');




//connect to database
const mongostring = process.env.DATABASE_URL

async function main() {
mongoose.connect(mongostring, {useNewUrlParser: true});
main().catch(err => console.log(err));
}

//Create database schema

  const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret:String
});



userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);




const User = new mongoose.model("User", userSchema);




module.exports = User;

