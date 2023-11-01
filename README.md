readme
npm run start로 실행

mongodb -> db 사용, 좀 더 간편한 사용을 위해서 mongoose 사용 : npm install mongoose --save


body parser - 클라이언트에서 가져오는 자료를 분석해서 출력해줌 : npm install body-parser --save

postman - 서버로 데이터를 보내는 기능(api test 하는 툴)
save 함수가 원래 인수를 받았는데 더 이상 받지 않게 되면서 비동기 함수를 다르게 적용해야 함

nodemon - 소스의 변화를 자동으로 감지해서 자동으로 서버를 재시작 해줌, 새로고침은 해야 함 : npm install nodemon --save-dev (dev는 development mode)

따로 개인 정보를 저장하기 위해서 gitignore을 사용해서 변수로 적어두기, 이때 배포 환경인지 개발환경인지에 따라서 변수가 달라지므로 모든 경우 고려해서 작성할 것

비밀번호가 너무 노출되기 때문에 암호화를 할 필요가 있음 - npm install bcrypt --save

로그인에 성공한 경우, 해당 사용자를 위해서 token을 만들어야 함 - npm install jsonwebtoken --save

불러온 유저 정보의 토큰을 쿠키에 저장하기 위해서 쿠키를 분석하는 것을 설치해야 함 - npm install cookie-parser --save

authentication - 각 사용자 별로 접근 가능한 권한을 제어하기 위해서 필요함

로그아웃 - 로그아웃하려고 하는 유저의 db를 찾아서 그 유저의 토큰을 지움, 토큰을 없애게 되면 인증을 할 때 사용했던 토큰에 변화가 생기므로 인증이 풀림