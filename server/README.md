# 0921 
# BackEnd Part
-----------------------
# Node.js 내용 
---------------
## 1. express 설치
    npm install express --save
------------
## 2. mongoose 설치
    npm install mongoose --save
------------
## 3. config 폴더 만들고 mongoURI 암호화
------------
## 4. 스키마 작성  
    name, lastname, email, password, role, image, token, tokenExp 추가 
------------
## 5. bady-parser 및 nodemon 설치 
    npm install bady-parser --save
    npm install nodemon --save
------------
## 5-1 bady-parser 할시 중요 포인트
    index.js 내용중
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json()); 
    가 없으면 DB에 JSON 타입을 제대로 읽지 못한 상태로 올라간다. 
------------
## 6. bcrypt install 
    npm install bcrypt --save
    models/User.js 부분에 userSchema.pre는 유저 모델에 정보를 보내주기 전에 작업을 한것이다.
------------
## 7. jsonwebtoken install

-------------
## 8. cookie-parser

-------------
# 로그인 파트가 현재까지는 제일 어려웠다. 코드를 보고 다시 복습

# auth 생성
1. 페이지 이동 할때 마다 로그인 되어있는지 안되어있는지 관리자 인지 체크
2. 글을 쓸때나 지울떄 같은곳에 권한이 잇는지 체크 
3. 이것은 나중에 clien를 사용하때 사용한다.

# 회원 정보 및 상품 정보 분리
    index.js의 회원 정보 back부분을 routes폴더의 users.js로 분리
    
---------------
# 렌딩페이지 만들기
---------------
## 데이터 베이스에 들어 있는 모든 상품 정보 확인(개발자 도구)
![test](./img/LandPage_dbData.png)
---------------
## 렌딩페이지 사진 Limit 설정 
---------------
## 자료가 더 없으면 더보기 버튼 사라지기
---------------
