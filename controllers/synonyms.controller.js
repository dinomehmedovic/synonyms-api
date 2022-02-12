
async function get(req, res, next) {
    try {
      res.json({ synonyms: ['Table', 'Desk', 'Board']});
    } catch (err) {
        console.error(`Error while getting synonyms`, err.message);
        next(err);
    }
  }
  
  module.exports = {
    get
  };