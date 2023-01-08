const express = require('express');
const router  = express.Router();
const controller = require('./controller');


// Contact APIs > contactController
router.post('/user', controller.create);
router.get('/user', controller.read);
router.put('/user', controller.update);
router.delete('/user', controller._delete);

//Healthcheck
router.get('/healthcheck', (req, res) => {
    return res.status(200).send("Success");
});

module.exports = router;