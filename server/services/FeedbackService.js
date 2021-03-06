const fs = require('fs');
const util = require('util'); // to get a helper from utility to later add promises to my readfile Func.

const readFile = util.promisify(fs.readFile); // creating a promise ready readFile Function. i.e. patching readfile with a promise.
const writeFile = util.promisify(fs.writeFile); // creating a promise ready readFile Function. i.e. patching readfile with a promise.

class FeedbackService {

        constructor(datafile) {
                this.datafile = datafile;
        }

        async getData() {
                const data = await readFile(this.datafile, 'utf8');
                if(!data){
                     return [];   
                }

                return JSON.parse(data);
        }

        async addFeedbackEntry(name, title, message) {

                const data = await this.getData();
                data.unshift({name, title, message});

                return writeFile(this.datafile, JSON.stringify(data));
        }

        async getFeedbackList() {
            const data = await this.getData();

            return data;
    }


}

module.exports = FeedbackService;
