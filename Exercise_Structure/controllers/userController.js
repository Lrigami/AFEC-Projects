const express = require('express');
const userServices = require('../services/userServices');

// Routes avec requêtes et réponses qui font appel aux différentes fonctions de userServices        
class UserController {
    constructor() {
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    // Différentes méthodes pour CRUD : 
    async getAllUsers(req, res) {
        try {
            const users = await userServices.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userServices.getUserById(req.params.id);
            if(!user) return res.status(404).json({message: "User not found"});
            res.json(user);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async createNewUser(req, res) {
        try {
            const newUser = await userServices.createNewUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await userServices.updateUser(req.params.id, req.body);
            if (!updatedUser) return res.status(404).json({message: "User not found"});
            res.json(updatedUser);
        } catch {
            res.status(400).json({message: err.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await userServices.deleteUser(req.params.id);
            if(!deletedUser) return res.status(404).json({message: "User not found"});
            res.json({message: "User deleted with success."});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = new UserController(); 