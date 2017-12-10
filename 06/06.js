/*

ADVENT OF CODE 2017

===========================
DAY 6: Memory Reallocation
===========================

*/

// INPUT FOR THIS DAY'S PUZZLE:
var getInput = require(__dirname+'\\..\\'+'get-input.js');
var data = getInput.getInput('06').split('\t').map(Number);
/*

PART ONE 
---------

A debugger program here is having an issue: it is trying to repair a memory reallocation routine, but it keeps getting stuck in an infinite loop.

In this area, there are sixteen memory banks; each memory bank can hold any number of blocks. The goal of the reallocation routine is to balance the blocks between the memory banks.

The reallocation routine operates in cycles. In each cycle, it finds the memory bank with the most blocks (ties won by the lowest-numbered memory bank) and redistributes those blocks among the banks. To do this, it removes all of the blocks from the selected bank, then moves to the next (by index) memory bank and inserts one of the blocks. It continues doing this until it runs out of blocks; if it reaches the last memory bank, it wraps around to the first one.

The debugger would like to know how many redistributions can be done before a blocks-in-banks configuration is produced that has been seen before.

For example, imagine a scenario with only four memory banks:

The banks start with 0, 2, 7, and 0 blocks. The third bank has the most blocks, so it is chosen for redistribution.
Starting with the next bank (the fourth bank) and then continuing to the first bank, the second bank, and so on, the 7 blocks are spread out over the memory banks. The fourth, first, and second banks get two blocks each, and the third bank gets one back. The final result looks like this: 2 4 1 2.
Next, the second bank is chosen because it contains the most blocks (four). Because there are four memory banks, each gets one block. The result is: 3 1 2 3.
Now, there is a tie between the first and fourth memory banks, both of which have three blocks. The first bank wins the tie, and its three blocks are distributed evenly over the other three banks, leaving it with none: 0 2 3 4.
The fourth bank is chosen, and its four blocks are distributed such that each of the four banks receives one: 1 3 4 1.
The third bank is chosen, and the same thing happens: 2 4 1 2.
At this point, we've reached a state we've seen before: 2 4 1 2 was already seen. The infinite loop is detected after the fifth block redistribution cycle, and so the answer in this example is 5.

Given the initial block counts in your puzzle input, how many redistribution cycles must be completed before a configuration is produced that has been seen before?

PART TWO
------------

Out of curiosity, the debugger would also like to know the size of the loop: starting from a state that has already been seen, how many block redistribution cycles must be performed before that same state is seen again?

In the example above, 2 4 1 2 is seen again after four cycles, and so the answer in that example would be 4.

How many cycles are in the infinite loop that arises from the configuration in your puzzle input?

*/






 // FINDING SOLUTION TO PART ONE:

 var resultCollection = new Set();
 var banks = data.slice(); // using slice to make a copy of the data instead of reference
 var cycleCount = 0;

 resultCollection.add(banks.join());
 var resultSeen = false;

 // Do redistribution

 while (resultSeen==false) {
     
     // Find highest number:
     var highest = Math.max.apply(null, banks);
     // Find first incidence of highest number:
     var target = banks.indexOf(highest);
     banks[target] = 0;
     // Redistribution:
     while (highest > 0 ) {
         target++;
         // If we go out of bounds with new index, index % banks.length will move us back to start of array
         target = target % banks.length;
         banks[target]++;
         highest--;
     }

     cycleCount++;
     
     resultCollection.add(banks.join());
     // Now see if this arrangement has been seen before:
     if (cycleCount >= resultCollection.size ) {
         resultSeen = true;
     }

 }

 // Return the solution:
 console.log('Part 1 is ' + cycleCount);

 ///////////////////////////////// PART 2 //////////////////////////////////

 var cycleCount2 = 0;
 resultSeen = false;
 var resultCollection2 = new Set();
 resultCollection2.add(banks.join());

 while (resultSeen==false) {
    
    // Find highest number:
    var highest = Math.max.apply(null, banks);
    // Find first incidence of highest number:
    var target = banks.indexOf(highest);
    banks[target] = 0;
    // Redistribution:
    while (highest > 0 ) {
        target++;
        // If we go out of bounds with new index, index % banks.length will move us back to start of array
        target = target % banks.length;
        banks[target]++;
        highest--;
    }

    cycleCount2++;
    
    resultCollection2.add(banks.join());
    // Now see if this arrangement has been seen before:
    if (cycleCount2 >= resultCollection2.size ) {
        resultSeen = true;
    }

}

console.log('Part 2 is ' + cycleCount2);




























/*

function solution(part) {
    
        if (part == 1) {
    
            // FINDING SOLUTION TO PART ONE:

            var resultCollection = new Set();
            var banks = data.slice(); // using slice to make a copy of the data instead of reference
            var cycleCount = 0;

            resultCollection.add(banks.join());
            var resultSeen = false;

            // Do redistribution

            while (resultSeen==false) {
                
                // Find highest number:
                var highest = Math.max.apply(null, banks);
                // Find first incidence of highest number:
                var target = banks.indexOf(highest);
                banks[target] = 0;
                // Redistribution:
                while (highest > 0 ) {
                    target++;
                    // If we go out of bounds with new index, index % banks.length will move us back to start of array
                    target = target % banks.length;
                    banks[target]++;
                    highest--;
                }

                cycleCount++;
                
                resultCollection.add(banks.join());
                // Now see if this arrangement has been seen before:
                if (cycleCount >= resultCollection.size ) {
                    resultSeen = true;
                }

            }

            // Return the solution:
            return cycleCount
    
        } else if (part == 2) {
    
            // FINDING SOLUTION TO PART TWO:
            
            var resultCollection = [];
            
            var banks = data.slice(); // using slice to make a copy of the data instead of reference
            //console.log('banks when first set: '+banks);
            var cycleCount = 0;

            resultCollection.push(banks.join());
            var resultSeen1 = false;
            var resultSeen2 = false;
            var resultToMatch;
            var cyclesUntilSecondMatch = 0;

            // Do redistribution

            while (resultSeen2==false) {
                
                // Find highest number:
                var highest = Math.max.apply(null, banks);
                // Find first incidence of highest number:
                var target = banks.indexOf(highest);
                banks[target] = 0;
                // Redistribution:
                while (highest > 0 ) {
                    target++;
                    // If we go out of bounds with new index, index % banks.length will move us back to start of array
                    target = target % banks.length;
                    banks[target]++;
                    highest--;
                }

                cycleCount++;
                
                resultCollection.push(banks.join());
                //console.log(resultCollection); // array of strings like '1,12,54'...
                // Now see if this arrangement has been seen before:
                if (resultSeen1 == false) {
                    // we haven't seen the first one yet so we need to check for that:
                    
                    //if (cycleCount >= resultCollection.length) { // fix this
                    //    console.log('=== RESULT SEEN 1 happened, now watch for repeat ===')
                    //    resultSeen1 = true;
                    //    resultToMatch = resultCollection[resultCollection.length-1];
                    //    console.log('resultToMatch: '+resultToMatch);
                    //}
                    for (i = 0; i < resultCollection.length; i++) {
                        //console.log(banks.join())
                        if (resultCollection[i] == banks.join()) {
                            //console.log('=== RESULT SEEN 1 happened at cycleCount '+cycleCount+', now watch for repeat ===')
                            resultSeen1 = true;
                            resultToMatch = resultCollection[i];
                            //console.log('resultToMatch: '+resultToMatch);
                        }
                    }
                } else if (resultCollection[resultCollection.length-1] != resultToMatch ) {
                    //console.log('resultToMatch: '+resultToMatch);
                    //console.log('increase cyclesUntilSecondMatch ' + resultCollection[resultCollection.length-1]);
                    cyclesUntilSecondMatch++;
                } else if (resultCollection[resultCollection.length-1] == resultToMatch) {
                    
                    resultSeen2 == true;
                }
                
            }

            // Return the solution:
            return cyclesUntilSecondMatch;

        } else {
            error('solution function must receive 1 or 2');
        }
    
    }

// OUTPUTTING OUR SOLUTION:
//console.log("Your solution for DAY 6 PART 1 should be... *drumroll*..." + solution(1));
//console.log("Your solution for DAY 6 PART 2 should be... *drumroll*..." + solution(2));
*/