const { Router } = require('express');
const golferRoutes = require('./golferRoutes');

const router = Router();

router.use('/', golferRoutes);

module.exports = router;
