const express = require('express');
const router = express.Router();
const synonymsController = require('../controllers/synonyms.controller');

/* GET synonyms */
router.get('/:synonym', synonymsController.get);

module.exports = router;
