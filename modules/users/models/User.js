const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name minimum length cannot be less than 2 characters'],
    maxlength: [64, 'Name maximum length cannot not be greater than 64 characters']
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Email is required'],
    maxlength: [128, 'Email maximum length cannot not be greater than 64 characters'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, saltRounds)
  next()
});

const User = mongoose.model('users', userSchema)

module.exports = User
