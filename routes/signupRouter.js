const { Router } = require("express");

const signupRouter = Router();

const db = require("../db/queries");

signupRouter.get("/", (req, res) => {
  res.render("form");
});

module.exports = signupRouter;
