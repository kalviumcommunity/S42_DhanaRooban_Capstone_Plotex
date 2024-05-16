const router = require("express").Router();

const {handleHomeRoute,SignIn,getUserProfile,updateUser} = require('../Controller/UserControl')

router.get('/',handleHomeRoute);
router.get("/profile/:query",getUserProfile);
router.post('/sign',SignIn);
router.put('/UpdateUser',updateUser);
module.exports = router;
