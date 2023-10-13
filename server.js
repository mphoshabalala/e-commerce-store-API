const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//catch unhandled exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" }); //integrate with configuration environment variables

const DATABASE = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected succesfully!!!");
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("API rinning on port 5000");
});

// CATCH UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
