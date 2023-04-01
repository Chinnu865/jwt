const { createUser, getUser, getUserById, updateUser, deleteUser, getUserByEmail} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../middleware_auth/token_validation')

router.post('/', createUser);
router.get('/', checkToken, getUser);
router.get('/:id', checkToken, getUserById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);
router.post('/login', getUserByEmail);

module.exports = router;