const userService = require('../services/inscripcion.service');

exports.getAllUsers = (req, res) => {
  const users = userService.getAll();
  res.json(users);
};

exports.createUser = (req, res) => {
  const user = userService.create(req.body);
  res.status(201).json(user);
};