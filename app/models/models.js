const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const { Schema } = mongoose;


const userSchema = new Schema({
  name: String,
  imgURL: String,
  email: String,
  password: String
});

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageURL: { type: String },
  quantity: { type: Number, required: true },
  minimumStock: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = {
  User: mongoose.model('User', userSchema),
  Item: mongoose.model('Item', itemSchema),
};
