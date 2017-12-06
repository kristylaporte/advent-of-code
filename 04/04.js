/*

ADVENT OF CODE 2017

===========================
DAY 4: 
===========================

A new system policy has been put in place that requires all accounts to use a passphrase instead of simply a password. A passphrase consists of a series of words (lowercase letters) separated by spaces.

To ensure security, a valid passphrase must contain no duplicate words.

For example:

aa bb cc dd ee is valid.
aa bb cc dd aa is not valid - the word aa appears more than once.
aa bb cc dd aaa is valid - aa and aaa count as different words.

*/

// INPUT FOR THIS DAY'S PUZZLE:
const getInput = require(__dirname+'\\..\\'+'get-input.js');
const data = getInput.getInput('04');
var dataLines = getInput.breakLines(data);
// Split the lines (into arrays of strings) based on space characters:
for (let i = 0; i < dataLines.length; i++) {
    dataLines[i] = dataLines[i].split(' ');
}
/*

PART ONE 
---------
The system's full passphrase list is available as your puzzle input. How many passphrases are valid?

PART TWO
------------

Instructions go here.

*/

function solution(part) {

    if (part == 1) {

        // FINDING SOLUTION TO PART ONE:

        let validPhrases = 0;

        // Let's make each line a set of items, then check set length against original length. If the length matches, the phrase must be valid:
        for (let i = 0; i < dataLines.length; i++) {
            // Make a set version of the line so it won't contain duplicate words:
            var dataLinesSet = new Set(dataLines[i]);
            // If the set is the same length as the original line, then it did not contain any duplicate words so increment validPhrases count:
            validPhrases += dataLines[i].length == dataLinesSet.size ? 1 : 0;
        }
        
        // Return the solution:
        return validPhrases; 

    } else if (part == 2) {

        // FINDING SOLUTION TO PART TWO:
        let validPhrases = 0;
        
        // Let's make each line a set of items, then check set length against original length. If the length matches, the phrase must be valid:
        var dataLinesSet;
        for (let i = 0; i < dataLines.length; i++) {
            // Convert word characters to array, sort alphabetically, convert word back to string:
            for (let j = 0; j < dataLines[i].length; j++) {
                dataLines[i][j] = dataLines[i][j].split('').sort().join('');
            }
            // Make a set of the line so duplicate words get removed:
            dataLinesSet = new Set(dataLines[i]);
            // If the set is the same length as the original line, then it did not contain any duplicate words so increment validPhrases count:
            validPhrases += dataLines[i].length == dataLinesSet.size ? 1 : 0;
        }
                
        // Return the solution:
        return validPhrases; 

    } else {
        error('solution function must receive 1 or 2');
    }

}

// OUTPUTTING OUR SOLUTION:
console.log("Your solution for DAY 4 PART 1 should be... *drumroll*...\n" + solution(1));
console.log("Your solution for DAY 4 PART 2 should be... *drumroll*...\n" + solution(2));