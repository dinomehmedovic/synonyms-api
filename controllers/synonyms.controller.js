const httpStatus = require("http-status");
const synonymsValidator = require("../utils/synonyms-validator");
const synonymsService = require("../services/synonyms.service");

async function get(req, res, next) {
  try {
    // Validate synonym from params
    synonymsValidator.validateSynonymFormat(req.params.synonym);
    // Get synonyms
    const synonyms = await synonymsService.getSynonyms(
      req.params.synonym.toLowerCase()
    );
    res.json(synonyms);
  } catch (err) {
    console.error(`Error while getting synonyms`, err.message);
    next(err);
  }
}

async function post(req, res, next) {
  try {
    // Validate synonym from params
    synonymsValidator.validateSynonymFormat(req.params.synonym);
    // Validate synonyms from body
    synonymsValidator.validateSynonymsFormat(req.body.synonyms);
    // Add new synonyms
    const synonymsResponse = await synonymsService.createSynonyms(
      req.params.synonym.toLowerCase(),
      req.body.synonyms
    );
    res.json(synonymsResponse);
  } catch (err) {
    console.error(`Error while getting synonyms`, err.message);
    next(err);
  }
}

async function patch(req, res, next) {
  try {
    // Validate synonym from params
    synonymsValidator.validateSynonymFormat(req.params.synonym);
    // Validate updated synonym from body
    synonymsValidator.validateSynonymFormat(req.body.synonym);
    // Update synonym
    const synonymsResponse = await synonymsService.updateSynonym(
      req.params.synonym.toLowerCase(),
      req.body.synonym
    );
    res.json(synonymsResponse);
  } catch (err) {
    console.error(`Error while getting synonyms`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    // Validate synonym from params
    synonymsValidator.validateSynonymFormat(req.params.synonym);
    // Delete synonym
    const synonymsResponse = await synonymsService.deleteSynonym(
      req.params.synonym.toLowerCase()
    );
    // Check if synonym is successfully delete and return error if not
    if (synonymsResponse) {
      res.status(httpStatus.NO_CONTENT).send();
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong while deleting synonym!" });
    }
  } catch (err) {
    console.error(`Error while getting synonyms`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  post,
  patch,
  remove,
};
