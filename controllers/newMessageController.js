const db = require("../db/queries");

async function newMessageCreate(req, res) {
  try {
    const { title, text, authorID } = req.body;
    await db.postNewMessage(title, text, Number(authorID));
    res.redirect("/");
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).send("Error creating message");
  }
}
async function deleteMessageById(req, res) {
  try {
    const { id } = req.params;
    const query = Number(id);
    await db.postDeleteMessage(query);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Error deleting message");
  }
}

module.exports = {
  newMessageCreate,
  deleteMessageById,
};
