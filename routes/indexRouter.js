const { Router } = require("express");

const indexRouter = Router();

const db = require("../db/queries");

const newMessageController = require("../controllers/newMessageController");
const newUserController = require("../controllers/newUserController");

async function getAllMembers(req, res) {
  const members = await db.getAllMembers();
  const member = members[0];
  return member;
}

indexRouter.get("/", async (req, res) => {
  const members = getAllMembers();
  const messages = await db.getAllMessagesAndAuthors();
  console.log(req.user);
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

indexRouter.post("/membership", newUserController.newMemberValidate);

// indexRouter.post("/membership", async (req, res) => {
//   let currentUser = res.locals.currentUser;
//   console.log(req.body.secretCode);
//   console.log(currentUser);
//   const messages = await db.getAllMessagesAndAuthors();
//   await db.setMemberStatus(res.locals.currentUser);
//   res.render("welcome");
// });

indexRouter.get("/member", async (req, res) => {
  res.render("member");
});

indexRouter.post("/message", newMessageController.newMessageCreate);

module.exports = indexRouter;
