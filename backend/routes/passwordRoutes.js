const express = require('express');
const verifyToken = require('../middleware/auth');
const { getAll, create, update, remove } = require('../controllers/passwordController');

const router = express.Router();

router.use(verifyToken);
router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
