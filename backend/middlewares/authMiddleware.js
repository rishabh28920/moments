const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if(!token)
  {
    return res.sendStatus(403);
  }
  try
  {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.username = data;
    return next();
  }
  catch{
    return res.sendStatus(403);
  }
}

module.exports = {authenticateToken};