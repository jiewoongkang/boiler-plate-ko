const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");
const { auth } = require("./middleware/auth");
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
// 쿠키 파서 사용
app.use(cookieParser());

// mongoose
//   .connect(
//     "mongodb+srv://jiewoongkang:c2093822@@@boilerplate.pmg4uyx.mongodb.net/?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     }
//   )
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

//   const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://jiewoongkang:c2093822@@@boilerplate.pmg4uyx.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.get("/api/hello", (req, res) => res.send("Hello World!~~ "));

// app.get("/api/hello", (req, res) => {
//   res.send("안녕하세요 서버에서 주는 값");
// });

app.post("/api/users/register", (req, res) => {
  // 회원가입에 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  console.log("body", req.body);

  user.save((err, doc) => {
    if (err) {
      console.log("err", err);
      console.log("doc", doc);
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  console.log("login", req.body.email);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    } else {
      console.log("이메일 찾았음");
    }

    // 요청된 이메일이 데이터 베이스에 있는 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        console.log("비밀번호", "비밀번호 틀렸습니다..");
        return res.json({
          loginSucess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      } else {
        console.log("비밀번호", "비밀번호 찾았습니다.");
        // 비밀번호가 까지 맞다면 token 생성
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          // 토큰을 저장한다.쿠키,로컬 스토리지
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      }
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // 여기 까지 미들웨어를 통화해 왔다는 애기는 Authentication 이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    // 0 일반 유저 0 이아니면 관리자
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).send({
      sucess: true,
    });
  });
});

//const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
