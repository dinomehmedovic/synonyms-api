const express = require('express');
const router = express.Router();
const synonymsController = require('../controllers/synonyms.controller');

/* GET synonyms */
router.get('/', synonymsController.get);

module.exports = router;