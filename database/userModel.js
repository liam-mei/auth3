const db = require("./dbConfig");
const bcrypt = require("bcryptjs");

function findAll() {
  return db("users");
}

function findAllBy(filter) {
  return db("users")
    .where(filter)
    .select("username", "authorization", "id");
}

function findOneBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

async function add(user) {
  const salt = await bcrypt.genSalt(14);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  const [id] = await db("users").insert(user);
  return findOneBy({ id });
}

async function update(user) {
  await db("users")
    .update(user)
    .where({ id: user.id });
  return findOneBy({ id: user.id });
}

function remove(id) {
  return db("users")
    .del()
    .where({ id });
}

module.exports = {
  findAll,
  findAllBy,
  findOneBy,
  add,
  update,
  remove
};
