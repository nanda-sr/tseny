const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require('passport-local-mongoose');

const userSchema = new Schema({

    firstName: String,
    lastName:String,
    email: String,
    wishlist: []

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

userSchema.plugin(plm, {usernameField: "email"});

module.exports = mongoose.model("User", userSchema);