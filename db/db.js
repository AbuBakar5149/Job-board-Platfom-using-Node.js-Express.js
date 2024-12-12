const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("jobdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    console.error("Failed to establish database connection", error);
  });
module.exports = sequelize;
