const express = require('express');
const app = express();
const router = express.Router();
const userController = require('./../controller/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.delete('/delete', userController.delete);
module.exports = router;