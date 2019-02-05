const express = require('express');
const router = express.Router();
const speakersRoute = require('./speakers/speakersIndex');
const feedbackRoute = require('./feedback/feedbackRoutes');

module.exports = (param) => {

    const {speakerService} = param;  // pulls the property speakerService from param and assigns to variable speakerService.
  
router.get('/', async(req, res,next) => {

    // const speakersList = await speakerService.getList();
    // const artwork = await speakerService.getAllArtWork();

    // the above code can give us performance penalty as it will be returned serially and they are async.

    const promises = [];

    promises.push(speakerService.getList());
    promises.push(speakerService.getAllArtWork());

    const results = await Promise.all(promises);    // to execute the promises.

    return res.render('index', {
        page: 'Home',
        speakersList: results[0],
        artwork: results[1]
    });
});

router.use('/speakers', speakersRoute(param));

router.use('/feedback', feedbackRoute(param));

return router;

};