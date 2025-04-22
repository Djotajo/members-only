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

async function setMemberStatus(username) {
  try {
    await sql`UPDATE members SET member_status = true WHERE username = ${username};`;
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error };
  }
}

async function getUser(username) {
  const user = await sql`SELECT * FROM members WHERE username = ${username}`;
  return user;
}

async function getUserById(id) {
  const user = await sql`SELECT * FROM members WHERE id = ${id}`;
  return user;
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

async function getAllMessagesAndAuthors() {
  const messages = sql`SELECT messages.title, messages.text, messages.created_at, members.username AS author FROM messages INNER JOIN members ON messages.author = members.id;`;
  return messages;
}

async function postNewMessage(title, text, authorID) {
  console.log(`${title}, ${text}, ${authorID}`);
  await sql`INSERT INTO messages(title, text, author) VALUES (${title}, ${text}, ${authorID})`;
  return;
}

module.exports = {
  postNewMember,
  getUser,
  getUserById,
  getAllMembers,
  setMemberStatus,
  getAllMessages,
  getAllMessagesAndAuthors,
  postNewMessage,
};
