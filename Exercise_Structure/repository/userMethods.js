const mongoose = require('mongoose');

// Schema pour les Users
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: false}
});

const User = mongoose.model('User', UserSchema);

// Méthodes pour CRUD Users
// exports.findAll = async () => await User.find();
// exports.findById = async (id) => await User.findById(id);
// exports.create = async (userData) => await new User(userData).save();
// exports.update = async (id, userData) => await User.findByIdAndUpdate(id, userData, { new: true });
// exports.delete = async (id) => await User.findByIdAndDelete(id);

// Classe Methode avec les différentes méthodes pour CRUD un tableau
// Utile lorsque l'on devra appliquer les même méthodes à des tableaux différents.
class Method {
    constructor(table) {
        this.table = table;
    }

    // Methods
    async findAll() {
        return await this.table.find();
    }

    async findById(id) {
        return await this.table.findById(id);
    }

    async create(data) {
        return await new this.table(data).save();
    }

    async update(id, data) {
        return await this.table.findByIdAndUpdate(id, data, {new: true});
    }

    async delete(id) {
        return await this.table.findByIdAndDelete(id);
    }
}

const userMethods = new Method(User);

module.exports = userMethods;