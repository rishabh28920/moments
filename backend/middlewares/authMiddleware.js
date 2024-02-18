const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  console.log(req.cookies);
  if(!token)
  {
    return res.sendStatus(403);
  }
  try
  {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.username = data;
    console.log(`username: ${data}`)
    return next();
  }
  catch{
    console.log("error");
    return res.sendStatus(403);
  }
}

module.exports = {authenticateToken};