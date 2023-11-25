const express = require("express");
const taskApi = require("./app/routes/task.routes");
const userApi = require("./app/routes/user.route")
const { sequelize, connecDb } = require("./app/config/db");
const { response } = require("express");

const app = express();
const PORT = 3000;

//convert data to json
app.use(express.json());

//define router
taskApi(app);
userApi(app);

app.listen(PORT, async () => {
  console.log(`Server is running at http:localhost:${PORT}`);
  await connecDb();
});
