const httpStatus = require("http-status");
const mongoDB = require("../db.config");
const ApiError = require("../utils/api-error");

async function getSynonyms(synonym) {
  const synonymsCollection = mongoDB.getDb().collection("synonyms");
  // Look for synonyms in DB for selected synonym
  const synonymsResponse = await synonymsCollection.findOne({
    synonyms: synonym,
  });
  // Check and format synonyms response
  return synonymsResponse
    ? { synonyms: synonymsResponse.synonyms }
    : { synonyms: [] };
}

async function createSynonyms(mainWord, synonyms) {
  const synonymsCollection = mongoDB.getDb().collection("synonyms");
  // Check if selected synonym already exists
  const synonymsResponse = await synonymsCollection.findOne({
    synonyms: mainWord,
  });
  // If synonym already exists make query
  const query = synonymsResponse
    ? { $addToSet: { synonyms: { $each: synonyms } } } // to add new synonyms without adding duplicates
    : { $set: { synonyms: [mainWord, ...synonyms] } }; // to create new document in DB with new synonyms
  // Execute created query
  await synonymsCollection.updateOne(
    { synonyms: mainWord },
    { ...query },
    { upsert: true }
  );
  // Pull synoyms
  const createdSynonyms = await synonymsCollection.findOne({
    synonyms: mainWord,
  });
  // Check and format created synonyms response
  return createdSynonyms
    ? { synonyms: createdSynonyms.synonyms }
    : { synonyms: [] };
}

async function updateSynonym(synonym, updatedSynonym) {
  const synonymsCollection = mongoDB.getDb().collection("synonyms");
  // Execute update synonym method
  await synonymsCollection.updateOne(
    { synonyms: synonym },
    {
      $set: {
        "synonyms.$": updatedSynonym,
      },
    }
  );
  // Pull updated synoyms
  const updatedSynonyms = await synonymsCollection.findOne({
    synonyms: updatedSynonym,
  });
  // Check and format updated synonyms response
  return updatedSynonyms
    ? { synonyms: updatedSynonyms.synonyms }
    : { synonyms: [] };
}

async function deleteSynonym(synonym) {
  const synonymsCollection = mongoDB.getDb().collection("synonyms");
  // Check if selected synonym already exists
  const synonymsResponse = await synonymsCollection.findOne({
    synonyms: synonym,
  });
  if (!synonymsResponse) {
    // If synonym is not found in DB, throw NOT_FOUND error
    throw new ApiError(httpStatus.NOT_FOUND, "Synonym not found");
  }
  let resp;
  if (synonymsResponse.synonyms.length > 1) {
    // If there is more than 1 synonyms in synonmys array, delete synonym from synonyms array
    resp = await synonymsCollection.updateOne(
      { synonyms: synonym },
      {
        $pull: {
          synonyms: synonym,
        },
      }
    );
  } else {
    // If it is last synonym in synonyms array, delete whole mongoDB document
    resp = await synonymsCollection.deleteOne({ synonyms: synonym });
  }
  return resp.acknowledged && (resp.modifiedCount || resp.deletedCount);
}

module.exports = {
  getSynonyms,
  createSynonyms,
  updateSynonym,
  deleteSynonym,
};
