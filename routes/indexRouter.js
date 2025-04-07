const { Router } = require("express");

const indexRouter = Router();

const db = require("../db/queries");

async function getAllMembers(req, res) {
  const members = await db.getAllMembers();
  const member = members[0];
  return member;
}

indexRouter.get("/", async (req, res) => {
  const members = getAllMembers();
  const messages = await db.getAllMessagesAndAuthors();
  res.render("index", { user: req.user, messages: messages });
});

indexRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = indexRouter;
