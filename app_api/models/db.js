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

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});

require("./schemas/products.js");
