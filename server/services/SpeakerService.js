const fs = require('fs');
const util = require('util'); // to get a helper from utility to later add promises to my readfile Func.

const readFile = util.promisify(fs.readFile); // creating a promise ready readFile Function. i.e. patching readfile with a promise.

class SpeakerService {
        constructor(datafile) {
                this.datafile = datafile;
        }

        async getNames() {
                const data = await this.getData();

                return data.map((speaker) => {
                        return {name: speaker.name, shortName: speaker.shortname};
                });
        }

        async getData() {
                const data = await readFile(this.datafile, 'utf8');
                if(!data){
                     return [];   
                }

                return JSON.parse(data).speakers;
        }

        async getList() {
                const data = await this.getData();
                if(!data){
                     return [];   
                }

                return data.map((speaker) => {
                        return {name: speaker.name,
                                shortName: speaker.shortname,
                                title: speaker.title
                        };
                });
        }

        async getFullList() {
                const data = await this.getData();
                if(!data){
                     return [];   
                }

                return data.map((speaker) => {
                        return {name: speaker.name,
                                shortName: speaker.shortname,
                                title: speaker.title,
                                summary: speaker.summary
                        };
                });
        }

        async getAllArtWork() {
                const data = await this.getData();
                const artwork = data.reduce((acc, elm) => {
                        if(elm.artwork) {
                                acc = [...acc, ...elm.artwork];
                        }

                        return acc;
                }, []);                                   // initializing the acc as an empty array.

                return artwork;
        }

        async getSpeaker(shortName) {
                const data = await this.getData();
                const speaker = data.find((speaker) => {
                        return speaker.shortname === shortName;
                });

                if(!speaker) return null;

                return{
                        title: speaker.title,
                        name: speaker.name,
                        shortname: speaker.shortname,
                        description: speaker.description,
                }
        }

        async getArtworkForSpeaker(shortName) {
                const data = await this.getData();
                const speaker = data.find((speaker) => {
                        return speaker.shortname === shortName;
                });

                if(!speaker || !speaker.artwork) return null;

                return speaker.artwork;
        }



}

module.exports = SpeakerService;
