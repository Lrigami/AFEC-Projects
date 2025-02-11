const mongoose = require('mongoose');

const getCollectionNames = async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);
        res.json(collectionNames);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = { getCollectionNames };
