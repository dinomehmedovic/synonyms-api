const express = require('express');
const router = express.Router();
const synonymsController = require('../controllers/synonyms.controller');

/* GET synonyms */
router.get('/:synonym', synonymsController.get);
router.post('/:synonym', synonymsController.post);
router.patch('/:synonym', synonymsController.patch);
router.delete('/:synonym', synonymsController.remove);

module.exports = router;
