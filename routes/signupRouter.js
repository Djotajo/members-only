const { Router } = require("express");

const signupRouter = Router();

const db = require("../db/queries");
const newUserController = require("../controllers/newUserController");

signupRouter.get("/", (req, res) => {
  res.render("form");
});

// signupRouter.post("/", async (req, res) => {
//   try {
//     const success = await newUserController.newUserCreate(req, res);
//     console.log(success);
//     if (success) {
//       res.redirect("/welcome");
//     } else {
//       res.status(400).send("User creation failed");
//     }
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

signupRouter.post("/", newUserController.newUserCreate);
module.exports = signupRouter;
