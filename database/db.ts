const { MongoClient } = require('mongodb');

// URL de connexion MongoDB
const url = 'mongodb://localhost:27017';

// Nom de la base de données et de la collection
const dbName = 'thickable_blog';
const collectionName = 'posts';

// Fonction pour se connecter à MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    return collection;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}

module.exports = { connectToMongoDB };
