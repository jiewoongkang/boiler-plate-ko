const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

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
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
