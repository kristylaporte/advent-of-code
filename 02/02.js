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


// Break data into individual lines (because each line is a row in the "spreadsheet"):
var os = require('os'); // for getting OS, so we can get the right EOL format
var dataLines = data.split(os.EOL);

function dayTwoPartOne (lines) {
    var sum = 0;
    for (var line of dataLines) {
        // Split the line (into array of strings) based on tab characters and convert to numbers:
        line = line.split('\t').map(Number);
        // Increment sum by the difference between the highest and lowest numbers in each line:
        sum += ( (Math.max.apply(Math, line)) - (Math.min.apply(Math, line)) )
    }
    return sum;
}

console.log('DAY TWO PART ONE solution: '+dayTwoPartOne(dataLines))
