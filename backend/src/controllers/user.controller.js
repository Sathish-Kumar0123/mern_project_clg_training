const User = require("../model/user.model");

async function createUser(req, res) {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "User Added!",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Users Retrieved",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User Found",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, 
            req.body,
             {
                new: true, 
                runValidators: true, 
             }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User Found",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function deleteUser(req, res) {
     try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User Found",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};