const express = require('express');
const createError = require('http-errors');
const path = require('path');
const configs = require('./config/config');
const SpeakerService = require('./services/SpeakerService');
const app = express();


const config = configs[app.get('env')];
const speakerService = new SpeakerService(config.data.speakers); // json data from config file.

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.locals.title = config.sitename;

if (app.get('env') === 'development') {
        app.locals.pretty = true;
}

const routes = require('./routes/routeIndex');

app.use(express.static('public'));
app.get('/favicon.ico', (req, res, next) => {
    return res.sendStatus(204); // to send empty response from the server.
})

//middleware for speakers list evaluation at each request to check if new speaker is added.
app.use(async (req, res, next) =>{
    try{
        const names = await speakerService.getNames();
        res.locals.speakerNames = names;
        return next(); // never forget to return next from any middlewares as it will halt the program.
    } catch(err){
        return next(err);
    }
});

app.use('/', routes({
    speakerService     // passing object here to like speakerService: speakerService
}));

app.use((req, res, next) => {
    return next(createError(404,'File not found'));
});

app.use((err, req, res, next) => {
        res.locals.message = err.message;
        const status = err.status || 500;
        res.locals.status = status;
        res.locals.error = req.app.get('env') === 'development' ? err : { };
        res.status(status);
        return res.render('error');
});

app.listen(3000);

module.export = app; // to get the application instance back.