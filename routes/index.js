const { Router } = require('express');
const golferRoutes = require('./golferRoutes');
const userRoutes = require('./userRoutes');
const tdmpfflRoutes = require('./tdmpfflRoutes');

const router = Router();

router.use('/', golferRoutes);
router.use('/user', userRoutes);
router.use('/tdmpffl', tdmpfflRoutes);

module.exports = router;
