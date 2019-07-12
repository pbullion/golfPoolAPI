const { Router } = require('express');
const golferRoutes = require('./golferRoutes');
const userRoutes = require('./userRoutes');

const router = Router();

router.use('/', golferRoutes);
router.use('/user', userRoutes);

module.exports = router;
