const app = require("./app");
const mongoose = require("mongoose");

const PORT = 5000;
const PASSWORD = "dWV6W3bkCAbxzCuJ"; // PdyfpRYrOnLGhDrz ---- dWV6W3bkCAbxzCuJ
const DATABASE = `mongodb+srv://mphoshabalala3401:${PASSWORD}@cluster1.drcxnjk.mongodb.net/e-commerce?retryWrites=true`;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected succesfully!!!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log("API rinning on port 5000");
});
