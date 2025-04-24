const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const passErr =
  "must be at least 8 characters long and include 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`FirstName ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("password")
    .isStrongPassword({
      minLength: 3,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(`Password ${passErr}`),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const validateMember = [
  body("secretCode").custom((value, { req }) => {
    if (value !== "Djotajo") {
      throw new Error("Wrong secret Code (Hint: It has 7 letters)");
    }
    return true;
  }),
];

exports.newMemberValidate = [
  ...validateMember,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("member", {
        title: "Become a member",
        errors: errors.array(),
      });
    }
    try {
      const currentUser = res.locals.currentUser;
      const username = currentUser.username;
      console.log("test");
      console.log(currentUser);

      await db.setMemberStatus(username);
      return res.redirect("/welcome");
    } catch (error) {
      console.error("Error validating member:", error);
      return res.status(500).render("member", {
        title: "Become a member",
        errors: [{ msg: "Something went wrong. Please try again." }],
      });
    }
  },
];

exports.newUserCreate = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    try {
      const { firstName, lastName, username, password } = req.body;
      const isAdmin = req.body.isAdmin === "on";

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.postNewMember(
        firstName,
        lastName,
        username,
        hashedPassword,
        isAdmin
      );
      return res.redirect("/welcome");
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).render("form", {
        title: "Create user",
        errors: [{ msg: "Something went wrong. Please try again." }],
      });
    }
  },
];
