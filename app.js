const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");
const http = require("http");
const db = require("./db/queries");
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;

require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use("/", indexRouter);
app.use("/signup", signupRouter);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
