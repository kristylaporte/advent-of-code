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

PART TWO
--------

"Based on what we're seeing, it looks like all the User wanted is some information about the evenly divisible values in the spreadsheet. Unfortunately, none of us are equipped for that kind of calculation - most of us specialize in bitwise operations."

It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

For example, given the following spreadsheet:

5 9 2 8
9 4 7 3
3 8 6 5
In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
In the second row, the two numbers are 9 and 3; the result is 3.
In the third row, the result is 2.
In this example, the sum of the results would be 4 + 3 + 2 = 9.

What is the sum of each row's result in your puzzle input?

*/

// INPUT FOR THIS DAY'S PUZZLE:
var getInput = require(__dirname+'\\..\\'+'get-input.js');
var data = getInput.getInput('02');

// Break data into individual lines (because each line is a row in the "spreadsheet"):
var os = require('os'); // for getting OS, so we can get the right EOL format
var dataLines = data.split(os.EOL);
// Split the lines (into arrays of strings) based on tab characters and convert resulting strings to numbers:
for (let i = 0; i < dataLines.length; i++) {
    dataLines[i] = dataLines[i].split('\t').map(Number);
}

function dayTwoPartOne (lines) {
    let sum = 0;
    for (var line of lines) {
        // Increment sum by the difference between the highest and lowest numbers in each line:
        sum += ( (Math.max.apply(Math, line)) - (Math.min.apply(Math, line)) )
    }
    return sum;
}

function dayTwoPartTwo(lines) {
    let sum = 0;
    for (var line of lines) {
        for (let i = 0; i < line.length; i++) {
            for(let j = 0; j < line.length; j++) {
                // If indexes are the same, ignore and continue because we don't want to compare a number against itself:
                if (i==j) {continue;}
                // Now that we know we're not comparing against ourself, if mod 0, divide and add result to our sum:
                if (line[i]%line[j]==0) {sum += line[i]/line[j]};
            }
        }
    }
    return sum;
}

console.log('DAY TWO PART ONE solution: '+dayTwoPartOne(dataLines));
console.log('DAY TWO PART TWO solution: '+dayTwoPartTwo(dataLines));
