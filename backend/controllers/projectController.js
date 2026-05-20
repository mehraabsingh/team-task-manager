const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { name, description, admin } = req.body;

    const project = await Project.create({
      name,
      description,
      admin,
      members: [admin],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("admin", "name email")
      .populate("members", "name email");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};