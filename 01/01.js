/*

ADVENT OF CODE 2017

===========================
DAY ONE: Inverse Captcha
===========================

The night before Christmas, one of Santa's Elves calls you in a panic. "The printer's broken! We can't print the Naughty or Nice List!" By the time you make it to sub-basement 17, there are only a few minutes until midnight. "We have a big problem," she says; "there must be almost fifty bugs in this system, but nothing else can print The List. Stand in this square, quick! There's no time to explain; if you can convince them to pay you in stars, you'll be able to--" She pulls a lever and the world goes blurry.

When your eyes can focus again, everything seems a lot more pixelated than before. She must have sent you inside the computer! You check the system clock: 25 milliseconds until midnight. With that much time, you should be able to collect all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day millisecond in the advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

*/

// INPUT FOR DAY ONE
// Using node.js's filesync module to get the input (syncronously):
var fs = require('fs');
try {
   var data = fs.readFileSync(__dirname+'\\01-input.txt', 'utf8');
} catch (error) {
    console.log('Error: ', error.stack)
}

const myInput = data;

/*

PART ONE 
---------

You're standing in a room with "digitization quarantine" written in LEDs along one wall. The only door is locked, but it includes a small interface. "Restricted Area - Strictly No Digitized Users Allowed."

It goes on to explain that you may only leave by solving a captcha to prove you're not a human. Apparently, you only get one millisecond to solve the captcha: too fast for a normal human, but it feels like hours to you.

The captcha requires you to review a sequence of digits (your puzzle input) and find the sum of all digits that match the next digit in the list. The list is circular, so the digit after the last digit is the first digit in the list.

For example:

1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.
1111 produces 4 because each digit (all 1) matches the next.
1234 produces 0 because no digit matches the next.
91212129 produces 9 because the only digit that matches the next one is the last digit, 9.
What is the solution to your captcha?

*/

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

console.log("Your solution for DAY ONE PART ONE should be... *drumroll*..." + sum);

/*

DAY ONE, PART TWO

Now, instead of considering the next digit, it wants you to consider the digit halfway around the circular list. That is, if your list contains 10 items, only include a digit in your sum if the digit 10/2 = 5 steps forward matches it. Fortunately, your list has an even number of elements.

For example:

1212 produces 6: the list contains 4 items, and all four digits match the digit 2 items ahead.
1221 produces 0, because every comparison is between a 1 and a 2.
123425 produces 4, because both 2s match each other, but no other digit has a match.
123123 produces 12.
12131415 produces 4.
What is the solution to your new captcha?

*/

// Reset our sum for part 2:
sum = 0;

// Look at every digit in the provided input one at a time and, if appropriate criteria met, add it to sum:
for (let i = 0; i < myInput.length; i++) {
    let length = myInput.length;
    let currentNumber = Number(myInput[i]);
    let targetIndex = i + length/2;
    let actualTargetIndex = targetIndex % length;
    let actualTargetIndexNumber = Number(myInput[actualTargetIndex]);
    sum += currentNumber == actualTargetIndexNumber ? actualTargetIndexNumber : 0;
}

console.log("Your solution for DAY ONE PART TWO should be... *drumroll*..." + sum);
