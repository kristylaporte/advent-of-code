/*

ADVENT OF CODE 2017

===========================
DAY 8: I Heard You Like Registers
===========================

*/

// INPUT FOR THIS DAY'S PUZZLE:
var getInput = require(__dirname+'\\..\\'+'get-input.js');
var data = getInput.getInput('08');

/*

PART ONE 
---------

You receive a signal directly from the CPU. Because of your recent assistance with jump instructions, it would like you to compute the result of a series of unusual register instructions.

Each instruction consists of several parts: the register to modify, whether to increase or decrease that register's value, the amount by which to increase or decrease it, and a condition. If the condition fails, skip the instruction without modifying the register. The registers all start at 0. The instructions look like this:

b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
These instructions would be processed as follows:

Because a starts at 0, it is not greater than 1, and so b is not modified.
a is increased by 1 (to 1) because b is less than 5 (it is 0).
c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).
c is increased by -20 (to -10) because c is equal to 10.
After this process, the largest value in any register is 1.

You might also encounter <= (less than or equal to) or != (not equal to). However, the CPU doesn't have the bandwidth to tell you what all the registers are named, and leaves that to you to determine.

What is the largest value in any register after completing the instructions in your puzzle input?

PART TWO
------------

To be safe, the CPU also needs to know the highest value held in any register during this process so that it can decide how much memory to allocate to these operations. For example, in the above instructions, the highest value ever held was 10 (in register c after the third instruction was evaluated).

*/

var dataLines = getInput.breakLines(data);
var registers = {};
var tracker = 0; // we'll use this to track the highest value we encounter (for part 2 solution)

// Let's start by setting up all the registers we need with their initial 0 value:
for (i = 0; i < dataLines.length; i++) {
    dataLines[i] = dataLines[i].split(' ');
    registers[dataLines[i][0]] = 0;
}

/*
Now each data line is an array where:
    [0] is the register name to edit
    [1] is the instruction to "inc" (+) or "dec" (-)
    [2] is the amount to inc or dec by
    [3] is the word "if" (can ignore this)
    [4][5][6] is the condition (register to look at, comparison operator, value to check against)
*/

//console.log(registers); // lists registers with value of 0 as expected, yay!

// Let's make a function to check condition
function checkCondition(cond1, oper, cond2) { // seems to work allright...
    switch (oper) {
        case '==':
            return Number(cond1) == Number(cond2);
            break;
        case '<':
            return Number(cond1) < Number(cond2);
            break;
        case '<=':
            return Number(cond1) <= Number(cond2);
            break;
        case '>':
            return Number(cond1) > Number(cond2);
            break;
        case '>=':
            return Number(cond1) >= Number(cond2);
            break;
        case '!=':
            return Number(cond1) != Number(cond2);
            break;
    }
}

// Function to do the inc. or dec. if condition met
function doTheMath(regToAdj, inst, instBy, regToCheck, oper, cond2) {
    // pass reference to the tracker var when doing step 2 so we can update it as necessary (used for tracking highest value encountered in any register)
    switch (inst) {
        case 'inc':
            if (checkCondition(registers[regToCheck], oper, cond2)) {registers[regToAdj] += instBy;}    
            break;
        case 'dec':
            if (checkCondition(registers[regToCheck], oper, cond2)) {registers[regToAdj] -= instBy;}    
            break;
    }
}


// Now lets loop the data lines and do the things.
for (i = 0; i < dataLines.length; i++) {
    doTheMath(
        //registers[dataLines[i][0]], // to use for register to adjust THIS IS GIVING VALUE NOT REFERENCE
        dataLines[i][0],            // to use to find register to adjust
        dataLines[i][1],            // inc or decr
        Number(dataLines[i][2]),    // amount to inc or decr by
        dataLines[i][4],            // to use to find register to check
        dataLines[i][5],            // operator
        Number(dataLines[i][6])    // second part of condition
        //registers                   // our register collection
    )
    // if register that we just updated is now higher than the tracker, update the tracker:
    tracker = registers[dataLines[i][0]] > tracker ? registers[dataLines[i][0]] : tracker;
}

//console.log(registers); // Looks right!

// Make registers obj into proper array so we can use Math.max:
var registersArray = Object.keys( registers ).map(function ( key ) { return registers[key]; });

console.log("Your solution for DAY 8 PART 1 should be... *drumroll*..." + 
    Math.max.apply(null, registersArray)
);

console.log("Your solution for DAY 8 PART 2 should be... *drumroll*..." + 
    tracker
);
