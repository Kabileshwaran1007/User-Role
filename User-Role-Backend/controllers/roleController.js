const Role = require('../models/Role');

// Create Role
exports.createRole = async (req, res) => {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json(role);
};

// Get All Roles
exports.getRoles = async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
};

// Update Role
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const role = await Role.findByIdAndUpdate(id, req.body, { new: true });
    res.json(role);
};

// Delete Role
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    await Role.findByIdAndDelete(id);
    res.status(204).send();
};