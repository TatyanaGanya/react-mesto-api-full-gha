const router = require('express').Router();
const signin = require('./signin');
const signup = require('./signup');
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/signup', signup);
router.use('/signin', signin);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
