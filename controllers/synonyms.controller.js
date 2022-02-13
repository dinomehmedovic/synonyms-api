const synonymsService = require('../services/synonyms.service');

async function get(req, res, next) {
    try {
      const synonymsResponse = await synonymsService.getSynonyms(req.params.synonym)
      if (synonymsResponse) {
        res.json({ synonyms: synonymsResponse.synonyms});
      } else {
        res.json({ synonyms: []});
      }
    } catch (err) {
        console.error(`Error while getting synonyms`, err.message);
        next(err);
    }
  }
  
  module.exports = {
    get
  };