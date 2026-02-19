/**
 * JWT authentication middleware.
 *
 * Verifies the Authorization header:
 * Authorization: Bearer <token>
 *
 * If valid:
 *   - attaches decoded payload to req.user
 *   - calls next()
 *
 * If invalid:
 *   - returns 401 Unauthorized
 *
 * @function authMiddleware
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next function
 */

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization; // "Bearer <token>"
  if (!header) return res.status(401).json({ message: "Token manquant" });

  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Format Authorization invalide" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ex: { id: "...", iat: ..., exp: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
