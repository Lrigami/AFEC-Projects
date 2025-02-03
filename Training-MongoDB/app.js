import { BSONType, MongoClient } from "mongodb";

const URI = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(URI);

updateProducts();

// Fonction pour se connecter à la base de données
async function updateProducts() {
    try {
        // Se connecter à MongoDB
        await client.connect();

        // Sélectionner la base de données
        const db = client.db("Products_Exercise");

        // Message de succès
        console.log(`Connexion à la base de données ${db.databaseName} réussie.`);

        // Schéma de validation
        const productSchema = db.createCollection("products", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["name", "price", "isDeleted"],
                    properties: {
                        name: {
                            bsonType: "String"
                        }, 
                        price: {
                            bsonType: "Number"
                        }, 
                        isDeleted: {
                            bsonType: "boolean"
                        }
                    }
                }
            }
        })

        // Sélectionner la collection
        const products = db.collection("products");

        // Nettoyer la collection avant les test
        const cursorDelete = await products.deleteMany({});

        // Insérer un document dans la collection
        const cursorInsertion = await products.insertMany([
            {name: "Salade de fruits", price: 4.99, isDeleted: false},
            {name: "Sandwich triangle", price: 2.49, isDeleted: false},
            {name: "Maquereaux à la moutarde", price: 2.10, isDeleted: false}
        ]);

        // Marquer un document comme supprimé (isDeleted: true)
        const cursorUpdate = await products.updateOne({name: "Salade de fruits"}, { $set: {isDeleted: true}});

        // Récupérer les documents uniquement si isDeleted: false
        const cursor = await products.find({ isDeleted: false });

        // Afficher les documents récupérés
        console.log("Documents récupérés avec succès.", await cursor.toArray());

    } catch (error) {
        console.error("Erreur de connexion à la base de données : ", error);
    } finally {
        client.close();
    }
}