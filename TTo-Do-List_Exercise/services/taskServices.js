// Functions that call the methods in taskRepository
const taskMethods = require('../reposiroty/taskRepository');

class Functions {
    async createNewTask(taskData) {
        if(!taskData.title) {
            throw new Error("A title is required.");
        }
        return await taskMethods.create(taskData);
    }

    async readAllTasks(page, limit) {
        return await taskMethods.readAll(page, limit);
    }

    async readOneTask(taskId) {
        return await taskMethods.readOne(taskId);
    }

    async updateTask(taskId, taskData) {
        if (!taskData.title) {
            throw new Error("A title is required.");
        }
        return await taskMethods.update(taskId, taskData);
    }

    async deleteTask(taskId) {
        return await taskMethods.delete(taskId);
    }
}

module.exports = new Functions();