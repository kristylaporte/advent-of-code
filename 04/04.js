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

/*

PART ONE 
---------
The system's full passphrase list is available as your puzzle input. How many passphrases are valid?

PART TWO
------------

Instructions go here.

*/

function solution(part) {
    
    var solution = "No solution yet..."

    if (part == 1) {

        // FINDING SOLUTION TO PART ONE:

    } else if (part == 2) {

        // FINDING SOLUTION TO PART TWO:

    } else {
        error('solution function must receive 1 or 2');
    }

    return solution;

}

// OUTPUTTING OUR SOLUTION:
console.log("Your solution for DAY 4 PART 1 should be... *drumroll*..." + solution(1));
console.log("Your solution for DAY 4 PART 2 should be... *drumroll*..." + solution(2));