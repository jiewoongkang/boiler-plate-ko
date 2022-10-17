const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));

const bodyParser = require("body-parser");

const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

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

app.get("/", (req, res) => {
  res.send("Hello World! ~~ 안녕하세요?");
});

app.post("/register", (req, res) => {
  // 회원가입에 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({
      sucess: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
