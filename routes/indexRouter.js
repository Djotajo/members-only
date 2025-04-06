const { Router } = require("express");

const indexRouter = Router();

const db = require("../db/queries");

async function getAllMembers(req, res) {
  const members = await db.getAllMembers();
  console.log(members);
  const member = members[0];
  return member;
}

indexRouter.get("/", (req, res) => {
  const members = getAllMembers();

  res.render("index", { user: req.user });
});

module.exports = indexRouter;
