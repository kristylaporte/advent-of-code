/*

ADVENT OF CODE 2017

===========================
DAY 5: 
===========================

An urgent interrupt arrives from the CPU: it's trapped in a maze of jump instructions, and it would like assistance from any programs with spare cycles to help find the exit.

*/

// INPUT FOR THIS DAY'S PUZZLE:
var getInput = require(__dirname+'\\..\\'+'get-input.js');
var data = getInput.getInput('05');
var dataLines = getInput.breakLines(data).map(Number);
/*

PART ONE 
---------

The message includes a list of the offsets for each jump. Jumps are relative: -1 moves to the previous instruction, and 2 skips the next one. Start at the first instruction in the list. The goal is to follow the jumps until one leads outside the list.

In addition, these instructions are a little strange; after each jump, the offset of that instruction increases by 1. So, if you come across an offset of 3, you would move three instructions forward, but change it to a 4 for the next time it is encountered.

For example, consider the following list of jump offsets:

0
3
0
1
-3
Positive jumps ("forward") move downward; negative jumps move upward. For legibility in this example, these offset values will be written all on one line, with the current instruction marked in parentheses. The following steps would be taken before an exit is found:

(0) 3  0  1  -3  - before we have taken any steps.
(1) 3  0  1  -3  - jump with offset 0 (that is, don't jump at all). Fortunately, the instruction is then incremented to 1.
 2 (3) 0  1  -3  - step forward because of the instruction we just modified. The first instruction is incremented again, now to 2.
 2  4  0  1 (-3) - jump all the way to the end; leave a 4 behind.
 2 (4) 0  1  -2  - go back to where we just were; increment -3 to -2.
 2  5  0  1  -2  - jump 4 steps forward, escaping the maze.

In this example, the exit is reached in 5 steps.

How many steps does it take to reach the exit?

PART TWO
------------

Now, the jumps are even stranger: after each jump, if the offset was three or more, instead decrease it by 1. Otherwise, increase it by 1 as before.

Using this rule with the above example, the process now takes 10 steps, and the offset values after finding the exit are left as 2 3 2 3 -1.

How many steps does it now take to reach the exit?

*/

function solution(part) {
    
        if (part == 1) {
    
            // FINDING SOLUTION TO PART ONE:

            let dataLinesPart1 = dataLines.slice(); // using slice to make a copy of the array instead of reference
            let i = 0; // Our index that we're currently at before each jump
            let jumps = 0; // Counting our jumps 

            do {

                // We'll need to reference our original index momentarily, so:
                let originalIndex = i; //console.log('originalIndex: '+originalIndex);
                // Make the jump (take the appropriate number of steps):
                i += dataLinesPart1[i]; //console.log('i after a jump: '+ i)
                // Increase jump count:
                jumps++;
                // Increment the value at the original index by 1:
                dataLinesPart1[originalIndex] += 1;
                // Check if we're done. If done, return our step count as our solution!
                if (i > dataLinesPart1.length-1) {
                    // Return the solution:
                    return jumps;
                }            

            } while (i < dataLinesPart1.length && i > 0);

    
        } else if (part == 2) {
    
            // FINDING SOLUTION TO PART TWO:
            
            let dataLinesPart2 = dataLines.slice(); // using slice to make a copy of the array instead of reference
            let i = 0; // Our index that we're currently at before each jump
            let jumps = 0; // Counting our jumps 

            do {

                // We'll need to reference our original index momentarily, so:
                let originalIndex = i; 
                // Make the jump (take the appropriate number of steps):
                i += dataLinesPart2[i]; 
                // Increase jump count:
                jumps++;
                // Increment the value at the original index by the appropriate amount:
                if (dataLinesPart2[originalIndex] > 2) {
                    dataLinesPart2[originalIndex] -= 1;
                } else {
                    dataLinesPart2[originalIndex] += 1;
                }
                // Check if we're done. If done, return our step count as our solution!
                if (i > dataLinesPart2.length-1 || i < 0) {
                    // Return the solution:
                    return jumps;
                }            

            } while (i < dataLinesPart2.length && i > 0);
    
        } else {
            error('solution function must receive 1 or 2');
        }
    
    }

// OUTPUTTING OUR SOLUTION:
console.log("Your solution for DAY X PART X should be... *drumroll*..." + solution(1));
console.log("Your solution for DAY X PART X should be... *drumroll*..." + solution(2));