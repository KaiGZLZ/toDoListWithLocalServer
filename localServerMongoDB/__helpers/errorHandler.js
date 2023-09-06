module.exports = errorHandler;

// Error management 
function errorHandler(err, req, res, next) {

    if (typeof (err) === 'string') {
        // Custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt error de autentication
        // Invalid Token
        return res.status(401).json({ message: 'The token authorization is wrong or expired. Please login again' });
    }
 
    // default 500 server error
    return res.status(500).json({ message: err.message });
}
