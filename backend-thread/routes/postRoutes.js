const {Router} = require('express');
const router = Router();
const {createPost} = require('../controllers/postController');


router.post('/create', createPost);


module.exports = router;