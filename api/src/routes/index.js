const express = require('express');

const health = require('./health');
const authorize = require('./authorize');

const router = express.Router();

router.use('/health', health);
router.use('/authorize', authorize);

module.exports = router;
