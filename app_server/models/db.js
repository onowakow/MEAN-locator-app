const mongoose = require("mongoose");
require("dotenv").config();
// MONGODB_PASS is heroku config variable. It exists on the heroku server.
const password = process.env.MONGODB_PASSWORD || process.env.MONGODB_PASS;
const dbURI = `mongodb+srv://owen:${password}@cluster0.23a4d.mongodb.net/petal-shop?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
