const {User} = require('../models/User')
let  auth = (req, res, next) =>{

    //인증처리를 하는곳

    //클라이언트 쿠키에서 토큰을 가져온다. - cookies-parser를 이용
    let token = req.cookies.x_auth;
    
    // 토큰을 복구화 한후 유저를 찾는다. - 먼저 유저를 가져온다.  
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true}) // 유저가 없을 경우

        req.token = token;
        req.user = user
        // 위와 같이 req.token, req.user를 한 이유는 index.js의 미들웨어에서 정보를 가져올수 있게 해주는 역할이다.
        
        next();
        // 미들웨어에서 계속 갈수 있게 만들어 준다.
        // next가 없을 경우 index.js의 미들웨어에 계속 머물게 된다. 
    })
    // 유저가 있으면 OK

    //유저가 없으면 NO

}
module.exports = {auth}; // 다른 파일에서 사용할수 있게 설정