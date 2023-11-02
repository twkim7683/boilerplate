const express = require('express'); //express module 가져오기
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true})); //bodyparser를 통해서 분석할 수 있도록 함
app.use(bodyParser.json()); //json 형태의 데이터를 분석할 수 있도록 함
app.use(cookieParser()); // cookie 데이터 분석 및 저장함


mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World! 반갑습니다~ 안녕하세요~~')); //기본 route

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요~~~ front와 back 연결 test 중');
})

app.post('/api/users/register', async (req, res) => {
    //회원 가입할 때 필요한 정보들을 client에서 가져오면 가져온 정보를 db에 넣기
    const user = new User(req.body);
    const result = await user.save()
        .then(() => {
            res.status(200).json({
                success: true
            });
        })
        .catch((err) => {
            res.json({ success: false, err });
        });
});

//login 기능
app.post('/api/users/login', (req, res) => {
    //1. 요청한 이메일을 db에서 찾기
    User.findOne({ email: req.body.email }).then(user => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }
        //2. 이메일이 있다면, 비밀번호 일치 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."});
            //3. 비밀번호 맞으면 토큰 생성하기 : jsonwebtoken library
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                //쿠키에 토큰을 저장하기 : cookieparser library
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id });
            });
        });
    });    
});

app.get('/api/users/auth', auth, (req, res) => {
    //여기 도착했다는 것은 미들웨어를 통과해서 auth를 true로 받았음을 의미함, 0인 경우만 일반 유저
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastename: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }).then(user => {
        return res.status(200).send({
            success: true
        });
    })
    .catch(err => {
        return res.json({success: false, err});
    })
});



app.listen(port, () => console.log(`Example app listening on port ${port}`));