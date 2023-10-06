const jwt = require("jsonwebtoken");

const jwtSecret = 'fbb903c9e9c1e81350e08699eac961a4e61eb314c19251ebf62f043bbd3ff0f4de560d';

exports.maxAge = 3 * 60 * 60;

exports.login = (value) => jwt.sign(value, jwtSecret, { expiresIn: '10ms' });

exports.auth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        console.log('MiddleWare :: err :: %j', err);

        console.log('MiddleWare :: %j', decodedToken);
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
            next()
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }