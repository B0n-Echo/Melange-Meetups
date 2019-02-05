const express = require('express');
const router = express.Router();
const speakersRoute = require('./speakers/speakersIndex');
const feedbackRoute = require('./feedback/feedbackRoutes');

module.exports = (param) => {

    const {speakerService} = param;  // pulls the property speakerService from param and assigns to variable speakerService.
  
router.get('/', async(req, res,next) => {

    const speakersList = await speakerService.getList();

    return res.render('index', {
        page: 'Home',
        speakersList
    });
});

router.use('/speakers', speakersRoute(param));


router.use('/feedback', feedbackRoute(param));

return router;

};