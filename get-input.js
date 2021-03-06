module.exports = {
    getInput: function(day) { // pass day as a two digit string, ie '01'
        var fs = require('fs');
        try {
            // Using node.js's filesync module to get the input from external file (syncronously):
           return fs.readFileSync(__dirname+'\\'+day+'\\'+day+'-input.txt', 'utf8');
        } catch (error) {
            console.log('Error: ', error.stack)
        }
    },
    breakLines: function (data) {
        var os = require('os');
        // break input data into array of lines:
        return data.split(os.EOL);
    }
}