import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user must have name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user must have password"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashing password before saving to database
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
