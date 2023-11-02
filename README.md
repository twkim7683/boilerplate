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

=================================================================================================================================

React 기본 구조

_actions
_reducers -> redux를 위한 폴더들

components/views -> 페이지들이 들어가는 곳

components/views/Sections -> 페이지에 관련된 css 파일, component

App.js -> Routing 관련 일 처리
Config.js -> 환경변수 설정
hoc -> higher order component
utils -> 여러 곳에서 쓰일 수 있는 것들을 넣어둠 


page 간의 이동을 위해서 react-router-dom을 사용

기존에는 client 화면이 없었기 때문에 postman을 사용했지만, 이제는 client가 있으므로 거기서 요청을 보내면 되는데 이때 사용하는 library가 axios
 - npm install axios --save
 이렇게 할 때, 서버와 클라이언트 포트를 맞춰야 함

포트를 맞춰도 CORS 정책 때문에 아무 설정 없이 Request를 보낼 수 없음 -> proxy 사용 - npm insatll http-proxy-middleware --save, src/setupProxy.js 만들기

proxy server에서 중간에 유저의 ip를 임의로 바꿀 수 있음, 방화벽, 웹 필터, 데이터 제공 기능 등의 기능이 있음

concurrently - front, backend 동시에 키기 - npm install concurrently --save

css framework for reactjs - ant design : 파일 크기가 크지만, 사용이 쉽고 깔끔한 디자인 - npm install antd --save(client 폴더 안에)

redux - 상태 관리 라이브러리(state)

설치 -> npm install redux react-redux redux-promise(dispatch가 promise를 받아들일 수 있도록) redux-thunk(dispatch가 function을 사용할 수 있도록) --save // 4가지

reducer - state가 변하면 이를 인식하고 변한 값을 다시 리턴하는 역할 -> 여러개를 합쳐서 combineReducers 이용


hoc -> 컴포넌트를 넣어서 자체 함수를 통해서 다른 컴포넌트를 반환함