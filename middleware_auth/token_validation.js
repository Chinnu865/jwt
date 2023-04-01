const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.get('authorization');
        if(token){
            token = token.slice(7);
            verify(token, process.env.ACCESS_SECRET_KEY, (error, decoded) => {
                if(err){
                    return res.json({
                        success:0,
                        message:'Invalid token'
                    });
                }
                else{
                    next();
                }
            })
        }else{
            return res.json({
                success:0,
                message:'unauthorized user'
            })
        }
    }
}