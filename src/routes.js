const express = require('express');
const router  = express.Router();
const contactController = require('./contactController');


// Contact APIs > contactController
router.post('/contact', contactController.create);
router.get('/contact/:id', contactController.read);
router.get('/contact', contactController.readAll);
router.put('/contact/:id', contactController.update);
router.delete('/contact/:id', contactController._delete);
router.delete('/contact', contactController._deleteAll);

//Healthcheck
router.get('/healthcheck', (req, res) => {
    return res.status(200).send("Success");
});

module.exports = router;