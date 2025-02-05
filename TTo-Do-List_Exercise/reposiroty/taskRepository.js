// Step 2 : Conceptualise Database : new Schema, model and 
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);

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

const taskMethods = new Method(Task);
module.exports = taskMethods;