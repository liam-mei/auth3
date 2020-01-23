// Import Packages
require("dotenv").config();
const server = require("./routers/server");
const secrets = require('./secrets')

const PORT = secrets.port || 5000;

server.listen(PORT, () => {
  console.log(`\n *** Server Running on http://localhost:${PORT} ***\n`);
});
