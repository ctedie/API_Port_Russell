/**
 * User model.
 *
 * @typedef {Object} User
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username requis"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "email requis"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "email invalide"],
    },
    password: {
      type: String,
      required: [true, "password requis"],
      minlength: 8,
      select: false, // par défaut on ne renvoie jamais le hash
    },
  },
  { timestamps: true }
);

// Hash du password avant save si modifié
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// Méthode pour comparer mot de passe
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", userSchema);
