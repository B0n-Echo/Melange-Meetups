const express = require('express');

const router = express.Router();

module.exports = (param) => {

const {speakerService} = param;

router.get('/', async(req, res,next) => {

    // const speakersList = await speakerService.getFullList();

    const promises = [];

    promises.push(speakerService.getFullList());
    promises.push(speakerService.getAllArtWork());

    const results = await Promise.all(promises);    // to execute the promises.

    return res.render('speakers', {
        page: 'All Speakers',
        speakersList: results[0],
        artwork: results[1]
    });
});

router.get('/:name', (req, res,next) => {

    return res.render('speakers/detail', {
        page: req.params.name
    });
});

return router;

};