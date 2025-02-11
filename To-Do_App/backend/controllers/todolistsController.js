const mongoose = require('mongoose');

const getCollections = async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionsData = await Promise.all(
            collections.map(async (col) => {
                const collectionName = mongoose.connection.db.collection(col.name);
                const totalDocument = await collectionName.estimatedDocumentCount();
                const doneDocument = await collectionName.countDocuments({ completed: { $eq: true}});
                return {
                    name: col.name,
                    total: totalDocument,
                    done: doneDocument
                };
            })
        )
        res.json(collectionsData);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = { getCollections };

/** modifier le fichier pour le découper en repository - services - controller - routes pour 
- récupérer toutes les collections 
- récupérer une seule collection
- ajouter une nouvelle collection
- changer de collection pour les to-do lists
**/