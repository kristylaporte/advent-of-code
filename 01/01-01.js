/*

Review a sequence of digits (your puzzle input) and find the sum of all digits that match the next digit in the list. The list is circular, so the digit after the last digit is the first digit in the list.

For example:

1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.
1111 produces 4 because each digit (all 1) matches the next.
1234 produces 0 because no digit matches the next.
91212129 produces 9 because the only digit that matches the next one is the last digit, 9.
What is the solution to your captcha?

*/

// Using node.js's filesync module to get the input (syncronously)
var fs = require('fs');
try {
   var data = fs.readFileSync(__dirname+'\\01-01-input.txt', 'utf8');
} catch (error) {
    console.log('Error: ', error.stack)
}

const myInput = data;

// Initialize sum (this will become our final solution):
var sum = 0;

// Look at every digit in the provided input one at a time and, if appropriate criteria met, add it to sum:
for (let i = 0; i < myInput.length; i++) {
    // Our current digit in question:
    let currentDigit = Number(myInput[i]);
    // If we're on the final digit, we need to compare to the FIRST digit:
    if (i == (myInput.length-1)) {
        // Add this last item to sum IF it matches the first item:
        sum += (currentDigit == Number(myInput[0]) ? currentDigit : 0)
    } else {
        // Else (we're NOT currently on the final digit), we need to compare the current digit to the following digit, and add it to sum if it matches:
        sum += (currentDigit == Number(myInput[i+1]) ? currentDigit : 0)
    }
}

console.log("Your solution should be... *drumroll*...\n...\n...\n" + sum + "\n!!!!!");