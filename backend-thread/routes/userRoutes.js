const {Router} = require("express");
const router = Router();
const {signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile} = require('../controllers/userController');
const protectRoutes = require("../middlewares/protectRoutes");


router.get('/profile/:username', getUserProfile);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/follow/:id', protectRoutes, followUnfollowUser);
router.post('/update/:id', protectRoutes, updateUser);


module.exports = router;