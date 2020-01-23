const knex = require("knex");
const knexfile = require("../knexfile");
const secrets = require("../secrets");

const ENVIRONMENT = secrets.environment || "development";

module.exports = knex(knexfile[ENVIRONMENT]);
