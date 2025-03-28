const sql = require("./sql");

async function getAllMembers() {
  const members =
    await sql`SELECT members.username, members.first_name FROM members`;
  return members;
}

async function getAllMessages() {
  const messages =
    await sql`SELECT messages.title, messages.text FROM messages`;
  return messages;
}

module.exports = {
  getAllMembers,
  getAllMessages,
};
