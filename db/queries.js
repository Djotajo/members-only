const sql = require("./sql");

async function postNewMember(firstName, lastName, username, hashedPassword) {
  try {
    await sql`INSERT INTO members(first_name, last_name, username, password_hashed, member_status) VALUES (${firstName}, ${lastName}, ${username}, ${hashedPassword}, 'No');`;
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error };
  }

  return;
}

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
  postNewMember,
  getAllMembers,
  getAllMessages,
};
