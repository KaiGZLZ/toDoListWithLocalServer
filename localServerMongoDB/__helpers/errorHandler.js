module.exports = errorHandler;

//Gestion de errores
function errorHandler(err, req, res, next) {

    if (typeof (err) === 'string') {
        // error de aplicación personalizada
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // error de validación de mongoose
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt error de autenticación
        //Token Inválido
        return res.status(401).json({ message: 'The token authorization is wrong or expired. Please login again' });
    }
 
    // default 500 server error
    return res.status(500).json({ message: err.message });
}
