// Functions that call the methods in taskRepository
const taskMethods = require('../repositories/taskRepository');

class Functions {
    async createNewTask(taskData) {
        if(!taskData.title) {
            throw new Error("A title is required.");
        }
        return await taskMethods.create(taskData);
    }

    async readAllTasks(page, limit, completion) {
        return await taskMethods.readAll(page, limit, completion);
    }

    async readOneTask(taskId) {
        return await taskMethods.readOne(taskId);
    }

    async updateTask(taskId, taskData) {
        return await taskMethods.update(taskId, taskData);
    }

    async deleteTask(taskId) {
        return await taskMethods.delete(taskId);
    }
}

module.exports = new Functions();