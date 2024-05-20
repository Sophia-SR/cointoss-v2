const jwt = require('jsonwebtoken');
const User = require('../models/User');


/**
 * Middleware function to authenticate a user based on the provided token in the request header.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} A promise that resolves when the authentication is successful, or rejects with an error if the authentication fails.
 */
const authenticate = async (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.header('Authorization');

  // If there is no authorization header, return a 401 Unauthorized response
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token from the authorization header
  const token = authHeader.replace('Bearer ', '');

  // If the token is empty, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

    // Find the user with the decoded user ID
    const user = await User.findByPk(decoded.userId);

    // If the user is not found, return a 401 Unauthorized response
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the user object to the request object
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    // Log the authentication error and return a 401 Unauthorized response
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
