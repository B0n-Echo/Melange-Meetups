const path = require('path');

module.exports = {
    development: {
        sitename: 'Melange Meetups [Development]',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json'),
        }
    },
    production: {
        sitename: 'Melange Meetups',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json'),
        }
    },
    
}