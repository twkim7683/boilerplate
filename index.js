const express = require('express'); //express module 가져오기
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const mongoose = require('mongoose');

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true})); //bodyparser를 통해서 분석할 수 있도록 함
app.use(bodyParser.json()); //json 형태의 데이터를 분석할 수 있도록 함


mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World! 반갑습니다~ 안녕하세요~~')); //기본 route

app.post('/register', async (req, res) => {
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

app.listen(port, () => console.log(`Example app listening on port ${port}`));