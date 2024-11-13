const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./Db");
const router = require("./routes/User.route");
const dotenv = require("dotenv");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use("/api/v1", router);

app.listen(3000, async () => {
  const db = new DB();

  console.log("Server is running on port 3000");
});
