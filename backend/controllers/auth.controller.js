const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email et password requis" });

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

exports.logout = async (req, res) => {
  // JWT stateless → rien à invalider côté serveur
  res.json({ message: "Logged out" });
};
