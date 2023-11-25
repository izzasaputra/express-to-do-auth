const authenticateToken = require('../middleware/authMiddleware');

module.exports = (app) => {
  const task = require("../controller/task.controller");
  const r = require("express").Router();

  r.get("/todos", authenticateToken, task.findAll);
  r.get("/todos/:id", authenticateToken, task.findById);
  r.post("/todos", authenticateToken, task.create);
  r.patch("/todos/:id", authenticateToken, task.updateIsComplete);
  r.put("/todos/:id", authenticateToken, task.update);
  r.delete("/todos/:id", authenticateToken, task.delete);
  app.use("/api", r);
};
