class AuthService{
    constructor(){}
    newSignedToken(userId, role){
        const payload = {
            "iss":"hospital-app",
            "sub":userId.toString(),
            "exp":"5m",
            "rl":role
          }
        return fetch('http://hospital-auth:3030/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"payload":payload})
        })
    }

    verifyToken(token, salt){
        return fetch('http://hospital-auth:3030/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({"salt":salt})
        })
    }
}

module.exports = new AuthService()