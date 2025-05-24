const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./config/db");

//  dotenv
dotenv.config();

// rest object

// database connction
connectdb();

const app = express();

//  middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/book", require("./routes/bookroutes"));
app.use("/api/review",require("./routes/reviewRoute"))
app.get("/", (req, res) => {
  return res.status(200).send("<h1> Welcome to  book api server</h1>");
});

//   port

const PORT = process.env.PORT || 8080;

//  listen
app.listen(PORT, () => {
  console.log(` server   is running on   ${PORT}`.black.bgBlue);
});

// C:\Users\LENOVO\Desktop\book api\server.js