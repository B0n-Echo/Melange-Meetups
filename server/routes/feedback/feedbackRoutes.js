const express = require('express');

const router = express.Router();

module.exports = () => {

router.get('/', (req, res,next) => {

    return res.send('FeedBack');
});

router.post('/', (req, res,next) => {

    return res.send('form sent');
});

return router;

};