const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// async function newUserCreate(req, res) {
//   try {
//     const { firstName, lastName, username, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await db.postNewMember(
//       firstName,
//       lastName,
//       username,
//       hashedPassword
//     );
//     console.log(result);
//     return result.success;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return false;
//   }
// }

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be a valid email address.";
const ageErr = "must be between 18 and 120.";
const bioErr = "must be max 200 characters";

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
  body("email").trim().isEmail().withMessage(`Email address ${emailErr}`),
  body("age")
    .optional({ values: "falsy" })
    .trim()
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age ${ageErr}`),
  body("bio")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 200 })
    .withMessage(`Bio ${bioErr}`),
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

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.postNewMember(
        firstName,
        lastName,
        username,
        hashedPassword
      );
      console.log(result);
      return result.success;
    } catch (error) {
      console.error("Error creating user:", error);
      return false;
    }
  },
];

// module.exports = {
//   newUserCreate,
// };
// module.exports = {
//   newUserCreate,
// };
