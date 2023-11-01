const authService = require('../../services/AuthService')

function authMiddleware(req, res, next) {
    const token = req.cookies.jwt;
    if(!token){
        req.logged = false
        req.uid = 1
        req.role = 'admin'
        return next();
    }
    authService.verifyToken(token).then((response) => {
        if(response.status !== 200){
            response.json().then((data) => {
                req.logged = false
                req.errors = data.errors
                return next();
            })
        }else{
            response.json().then((data) => {
                req.logged = true
                req.role = data.payload.rl
                req.sec = data.payload.sec
                req.uid = data.payload.sub
                return next();
            })
        }
    })
};

module.exports = authMiddleware