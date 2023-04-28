const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth");
const errors = require("./middlewares/error");

const app = express();
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database Connected");
    },
    (errors) => {
      console.log(errors);
    }
  );

// auth.authenticateToken.unless = unless;
// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       {
//         url: "users/login",
//         methods: ["POST"],
//       },
//       {
//         url: "users/register",
//         methods: ["POST"],
//       },
//     ],
//   })
// );

app.use(express.json());

app.use("/users", require("./routes/user.routes"));
app.use(errors.errorHandler);
app.listen(4000, function () {
  console.log("ready to go");
});
