/*

ADVENT OF CODE 2017

==============================
DAY TWO: Corruption Checksum
==============================

As you walk through the door, a glowing humanoid shape yells in your direction. "You there! Your state appears to be idle. Come help us repair the corruption in this spreadsheet - if we take another millisecond, we'll have to display an hourglass cursor!"

PART ONE
--------

The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum. For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

What is the checksum for the spreadsheet in your puzzle input?

*/

// GETTING INPUT:
var fs = require('fs');
var data;
try {
   data = fs.readFileSync(__dirname+'\\02-input.txt', 'utf8');
} catch (error) {
    console.log('Error: ', error.stack)
}

//console.log(data);

// Break data into individual lines (each line is a row in the "spreadsheet"):
var dataLines = data.split('\n');
//console.log(dataLines);


function dayTwoPartOne (lines) {
    console.log('dayTwoPartOne fired');
    console.log(lines);
    
    // DO THE IMPORTANT STUFF HERE

    return 'No solution yet...';
}

console.log('dayTwoPartOne solution: '+dayTwoPartOne(dataLines))
