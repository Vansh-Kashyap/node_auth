const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req?.headers["Authorization"];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "Snippet_secretKEY", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
const generateAccessToken = (username) => {
  return jwt.sign({ data: username }, "Snippet_secretKEY", {
    expiresIn: "1h",
  });
};

module.exports = { generateAccessToken, authenticateToken };
