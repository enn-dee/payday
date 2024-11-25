const mongoose = require("mongoose");
class DB {
  constructor() {
    DB.connectToDb();
  }
  static async connectToDb() {
    try {
      const dbUrl = process.env.DB_URL;
      await mongoose
        .connect(dbUrl)
        .then(() => {
          console.log("Connected to DB");
        })
        .catch((err) => {
          console.log(`Error Connecting Db: ${err.message}`);
        });
    } catch (err) {
      console.log(`Error Connecting Db: ${err.message}`);
    }
  }
}

module.exports = DB;
