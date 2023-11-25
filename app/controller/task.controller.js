const Task = require("../models/task.model");

exports.findAll = async (request, response) => {
  try {
    const tasks = await Task.findAll();
    response.status(200).json(tasks);
  } catch (err) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (request, response) => {
  try {
    const { content, description } = request.body;

    const newTask = Task.build({
      content: content,
      description: description,
    });

    await newTask.save();
    response.status(201).json(newTask);
  } catch (err) {
    response.json(err);
  }
};

exports.findById = async (request, response) => {
  try {
    const task = await Task.findOne({
      where: {
        id: request.params.id,
      },
    });
    if (task !== null) {
      return response.status(200).json(task);
    }
    response.status(200).json({ message: "Data Not Found" });
  } catch (err) {
    response.status(500).json(err);
  }
};

exports.updateIsComplete = async (request, response) => {
  try {
    const task = await Task.findOne({
      where: {
        id: request.params.id,
      },
    });

    const { is_complete } = request.body;

    await task.set({
      is_complete: is_complete,
    });

    await task.save();
    response.status(200).json({ message: "update success" });
  } catch (err) {
    response.status(500).json(err);
  }
};

exports.update = async (request, response) => {
  try {
    const task = await Task.findOne({
      where: {
        id: request.params.id,
      },
    });

    const { is_complete, content, description } = request.body;

    await task.set({
      content: content,
      description: description,
      is_complete: is_complete,
    });
    await task.save();
    response.status(200).json({ message: "update success" });
  } catch (err) {
    response.status(500).json(err);
  }
};

exports.delete = async (request, response) => {
  try {
    const task = await Task.findOne({
      where: {
        id: request.params.id,
      },
    });

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    response.status(204).json({ message: "Delete success" });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
