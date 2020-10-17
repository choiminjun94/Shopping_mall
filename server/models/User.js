const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
//saltRounds가 몇자리인지 설정
//salt을 이용해 암호화 한다.

const userSchema = mongoose.Schema({
  id: {
    type: String,
    maxlength: 50,
    trim: true,
    // match:[/^[{4,12}]+\.[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/,'Should be a vaild email address!'],
  },
  email: {
    type: String,
    trim: true, // 공백 없애주는 역할
    unique: 1, // 똑같은 email을 한번만 쓰게 해주는 역할
  },
  password: {
    type: String,
    maxlength: 100,
  },

  role: {
    type: Number,
    default: 0,
    // 관리자나 일반인 인것을 구별하는 역할
  },

  image: String,

  token: {
    type: String,
  },
  //유효성 관리
  tokenExp: {
    type: Number,
  },
  //토큰 유효기간
});

// 유저 모델에 정보를 저장하기 전에 작업
//index.js file의  user.save((err,userInfo)=>{ 전에 작업이 된다는 말이다.
userSchema.pre("save", function (next) {
  let user = this;
  //이렇게하면 바로 스키마를 가리치게 된다. - 기본 비밀번호를 가져오기 위한 작업

  if (user.isModified("password")) {
    // 비번이 변경 될때만 암호화 한다.
    //비번을 암호화 시키니다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      //err가 발생하면 바로 index파일의 err부분으로 이동
      bcrypt.hash(user.password, salt, function (err, hash) {
        // function 뒤의 hash는 암호화된 비밀번호 이다.
        if (err) return next(err);
        user.password = hash;
        //작업이 성공 했다면 기본 비밀번호를 hash비번으로 교체
        //작업이 끝난 후에 next()로 index파일에 정보를 전달
        next();
      });
    });
  } else {
    next();
  }
  //비번이 아니라 다른것을 바꿀때
  //이게 없으면 위에서 머문다.
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 암호화된 비번 찾은지 찾기
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  //jsonwebToken을 이용해서 token을 생성하기
  const token = jwt.sign(user._id.toHexString(), "secretToekn");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
  // user._id +'secretToekn' = token // 이 토큰을 가지고 누구인지 알수 있다.
};

userSchema.statics.findByToken = function(token, cb){
    let user = this; 
  
    //토큰을 decode 즉 복구하는 과정 - webtoken 공식 문서에 존재
    jwt.verify(token, 'secretToekn', function(err, decode){
      //유저 아이디를 이용해서 유저를 찾은 다음에 
      //클라이언트에서 가져온 Token과 db에서 보관된 토큰이 일치하는 확인
      user.findOne({"_id":decode, "token": token}, function(err, user){
  
        if(err) return cb(err)
        cb(null, user)
      })
  
    })
  }
  const User = mongoose.model("User", userSchema);


module.exports = { User };
// 다른곳에서도 사용하게 export
