const httpStatus = require("http-status");
const ApiError = require("../utils/api-error");

module.exports = {
  validateSynonymFormat: function (synonym) {
    // Check if synonym word is empty or contains special characters or numbers
    if (!/^[a-zA-Z ]+$/.test(synonym)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Synonym can't be empty or contain numbers or special characters"
      );
    }
  },

  validateSynonymsFormat: function (synonyms) {
    // Check if synonyms are null or empty
    if (!synonyms || synonyms.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Synonyms are required");
    }
    // Check if list of synonyms contains invalid synonyms
    synonyms.forEach((synonym) => {
      this.validateSynonymFormat(synonym);
    });
  },
};
