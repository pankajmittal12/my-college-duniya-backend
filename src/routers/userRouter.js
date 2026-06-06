const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validators');

const {
    createUserSchema
} = require('../validators/userValidator');

const {
    createUser
} = require('../controllers/userController');

const {
    getUsers
} = require('../controllers/userController');

router.get(
    '/getUser',
    getUsers
);

router.post(
    '/createUser',
    validate(createUserSchema),
    createUser
);

module.exports = router;