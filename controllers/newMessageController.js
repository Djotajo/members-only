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

  //   const item = await db.getItemByModel(model);
  //   res.render("layout", {
  //     title: model,
  //     content: "item",
  //     item: item,
  //     baseUrl: req.originalUrl,
  //     back: "/items",
  //   });
}

module.exports = {
  newMessageCreate,
};
