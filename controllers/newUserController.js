const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function newUserCreate(req, res) {
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
}

module.exports = {
  newUserCreate,
};
