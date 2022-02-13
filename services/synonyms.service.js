const mongoDB = require('../db.config');

async function getSynonyms(synonym) {
    const synonymsCollection = mongoDB.getDb().collection('synonyms');
    const query = { synonyms: synonym };
    return synonymsCollection.findOne(query);
}

module.exports = {
    getSynonyms
}