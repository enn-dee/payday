const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./Db");
const router = require("./routes/User.route");
const { AccountRouter } = require("./routes/Account.route");
const dotenv = require("dotenv");
const { TransacRoute } = require("./routes/Transaction.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

// user routes
app.use("/api/v1", router);

// account routes
app.use("/api/v1/", AccountRouter);

// transfer route
app.use("/api/v1", TransacRoute);

app.listen(3000, async () => {
  const db = new DB();
  console.log("Server is running on port 3000");
});
