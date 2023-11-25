const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expresstask", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const connecDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to our database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sequelize, connecDb };
