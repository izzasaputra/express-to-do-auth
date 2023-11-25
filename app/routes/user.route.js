module.exports = (app) => {
    const user = require("../controller/user.controller");
    const r = require("express").Router();
  
    r.post("/register", user.register);
    r.post("/login", user.login);

    app.use("/api", r);
  };