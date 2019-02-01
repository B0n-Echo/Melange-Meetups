const fs = require('fs');
const util = require('util'); // to get a helper from utility to later add promises to my readfile Func.

const readFile = util.promisify(fs.readFile); // creating a promise ready readFile Function. i.e. patching readfile with a promise.

class SpeakerService {
        constructor(datafile){
                this.datafile = datafile;
        }

        async getNames(){
                const data = await this.getData();

                return data.map((speaker) => {
                        return {name: speaker.name, shortName: speaker.shortname};
                });
        }

        async getData(){
                const data = await readFile(this.datafile, 'utf8');
                if(!data){
                     return [];   
                }

                return JSON.parse(data).speakers;
        }
}

module.exports = SpeakerService;
