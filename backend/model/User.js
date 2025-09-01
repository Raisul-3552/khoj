import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return value.includes("@") && value.includes(".");
      },
      message: "Email must contain @ and .",
    },
  },

  phone: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^\d+$/.test(value),   
      message: "Phone number must contain only digits",
    },
  },
  address: {
    type: String,
    required: true,
  },
  password: {
  type: String,
  required: true,
  minlength: 6, // at least 6 characters
  validate: {
    validator: function (value) {
      // must have at least one lowercase and one uppercase
      return /[a-z]/.test(value) && /[A-Z]/.test(value);
    },
    message: "Password must have at least 1 uppercase and 1 lowercase letter",
  },
},
});


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
