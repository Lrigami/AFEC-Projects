const userMethods = require('../repository/userMethods');

// Fonctions qui utilisent les méthodes dans userMethods

class UserService {
    async getAllUsers() {
        return await userMethods.findAll();
    }

    async getUserById(id) {
        return await userMethods.findById(id);
    }

    async createNewUser(userData) {
        if (!userData.name || !userData.email) {
            throw new Error('Name and email are required');
        }
        return await userMethods.create(userData);
    }

    async updateUser(id, userData) {
        return await userMethods.update(id, userData);
    }

    async deleteUser(id) {
        return await userMethods.delete(id);
    }
}

module.exports = new UserService();