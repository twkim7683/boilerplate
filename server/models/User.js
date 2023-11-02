const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //암호화된 비밀번호의 자리 수
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 1000
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function(next) { //'save'라는 함수를 사용하기 전에 할 행동을 정함
    //비밀번호 암호화
    var user = this;
    if(user.isModified('password')) { //비밀번호가 바뀌었을 때만 다시 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash; //hash가 암호화된 비밀번호이므로 바뀐 비밀번호로 수정해주기
                next();
            });
        });
    }
    else {
        next();
    }
} ) 

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //비밀번호를 확인하는 메소드, 입력한 패스워드와 암호화된 패스워드를 비교함, 이때, 입력한 패스워드를 암호화해서 비교해야 함
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    //jsonwebtoken을 사용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;

    user.save()
    .then(() => {
        cb(null, user);
    })
    .catch((err) => {
        cb(err);
    })
}

//user의 쿠키를 통해서 인증 확인하기
userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //토큰을 decode 한다
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //decode에 복호화된 id가 입력됨
        user.findOne({"_id": decoded, "token": token}).then(user=> {
            cb(null, user);
        })
        .catch(err=> cb(err));
    });
};


const User = mongoose.model('User', userSchema); //모델은 스키마를 감싸주는 역할, 스키마에는 각각의 정보 포함됨

module.exports = { User };