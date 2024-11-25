const Role = require('../models/Role');
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        console.log("entry--------------", req.body);

        const { username, role,email,password } = req.body;

        if (!username || !role) {
            return res.status(400).json({ message: 'Username and role are required' });
        }

      
        const rolee = await Role.findOne({ name: role });
        if (!rolee) {
            return res.status(200).json({ message: 'Role not found' });
        }
        console.log("roleeeeeeee",rolee);
        
        const user = new User({
            username,
            email,
            password,
            role: rolee._id, 
            createdAt: new Date(),
        });

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// Get All Users
exports.getUsers = async (req, res) => {
    const users = await User.find().populate('role');
    res.json(users);
};

// Update User
exports.updateUser = async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
    
        try {
            const user = await User.findById(id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            
            Object.assign(user, updatedData);
            await user.save(); 
    
            res.status(200).json(user); 
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: 'Failed to update user' });
        }
    };
// Delete User
exports.deleteUser  = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
};



