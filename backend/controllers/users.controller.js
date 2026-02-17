const User = require("../models/User");

// GET /users
exports.list = async (req, res) => {
  const users = await User.find().select("username email createdAt");
  res.json(users);
};

// GET /users/:email
exports.getByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "username email createdAt"
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// POST /users
exports.create = async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ email: email?.toLowerCase() });
  if (exists) return res.status(409).json({ message: "Email already used" });

  const user = await User.create({ username, email, password });
  res.status(201).json({ username: user.username, email: user.email });
};

// PUT /users/:email
exports.update = async (req, res) => {
  const { email } = req.params;
  const { username, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });

  if (username !== undefined) user.username = username;
  if (password !== undefined) user.password = password; // re-hash via pre("save")

  await user.save();
  res.json({ message: "User updated" });
};

// DELETE /users/:email
exports.remove = async (req, res) => {
  const { email } = req.params;
  const result = await User.deleteOne({ email: email.toLowerCase() });
  if (result.deletedCount === 0)
    return res.status(404).json({ message: "User not found" });
  res.status(204).send();
};
