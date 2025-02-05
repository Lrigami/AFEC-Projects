// Step 2 : Conceptualise Database : new Schema, model and 
const taskModel = require('../models/taskModel');

class Method {
    constructor(table) {
        this.table = table;
    }

    // Methods
    async create(data) {
        return await new this.table(data).save();
    }

    async readAll() {
        return await this.table.find();
    }

    async readOne(id) {
        return await this.table.findById(id);
    }
    
    async update(id, data) {
        return await this.table.findByIdAndUpdate(id, data, { new: true });
    }
    
    async delete(id) {
        return await this.table.findByIdAndDelete(id);
    }
};

const taskMethods = new Method(taskModel);
module.exports = taskMethods;