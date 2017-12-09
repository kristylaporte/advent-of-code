/*

ADVENT OF CODE 2017

===========================
DAY THREE: SPIRAL MEMORY 
===========================

*/

// INPUT FOR THIS DAY'S PUZZLE:
var getInput = require(__dirname+'\\..\\'+'get-input.js');
var data = getInput.getInput('03');
/*

PART ONE 
---------

You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

PART TWO
------------

As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?

*/



function solution(part) {
    
    if (part == 1) {

        // FINDING SOLUTION TO PART 1

        var grid = [];
        // Let's build the grid up to our number using the pattern that I figured out on paper earlier, using a pattern of drawing concentric squares spiralling out from the starting point in the center.
        
        // Starting point and first square to its right:
        grid[0] = {
            x: 0,
            y: 0,
            val: 1
        }
        grid[1] = {
            x: 1,
            y: 0,
            val: 2
        }
        // Start first concentric square pattern:
        var currentX = 1;
        var currentY = 0;
        var currentNum = 2;
        c = 1; // c represents which square we're currently on

        function setGridPoint(dir) {
            switch (dir) {
                case 'up' :
                    currentY++;
                    break;
                case 'left' :
                    currentX--;
                    break;
                case 'down' :
                    currentY--;
                    break;
                case 'right' :
                    currentX++;
                    break;     
                default:
                    error('setGridPoint(dir) must be given a string of "up", "left", "right" or "down".');    
            }
            currentNum++;
            grid[currentNum-1] = {
                val: currentNum,
                x: currentX,
                y: currentY
            }
        }
        
        while (currentNum <= data) {
            // Move up as necessary:
            for (i = 0; i < (2*c-1); i++ ) {
                setGridPoint('up');
            }
            // Move left as necessary:
            for (i = 0; i < (2*c); i++) {
                setGridPoint('left');
            }
            // Move down as necessary:
            for (i = 0; i < (2*c); i++) {
                setGridPoint('down');
            }
            // Move right as necessary, including an extra move right to start next concentric square:
            for (i = 0; i < (2*c+1); i++) {
                setGridPoint('right');
            }
            // Time to start a new square:
            c++;
        }
    
        // Now we should have a grid drawn that runs up to our target number, so how far is it from x0 y0?
        return Math.abs(grid[data-1].x) + Math.abs(grid[data-1].y);

    } else if (part == 2) {

        // FINDING SOLUTION TO PART TWO:
    
        var grid = [];
        // Let's build the grid up to our number using the pattern that I figured out on paper earlier, using a pattern of drawing concentric squares spiralling out from the starting point in the center.
        // For part 1 used an array of objects, but a multidimensional array is better for part 2, I think... Let's try it... e.g. grid[x][y] = number (NOTE: must define the first dimension of the array before you can assign the child values, so initialize properly if necessary each time to use it in any fashion.)
        
        // Manually setting starting point and second square:
        grid[0] = [];
        grid[0][0] = 1;
        grid[1] = [];
        grid[1][0] = 1;
        var currentX = 1;
        var currentY = 0;
        var currentNum = 1;
        c = 1; // c represents which concentric square we're currently on

        function setGridPoint(dir) {
            switch (dir) {
                case 'up' :
                    currentY++;
                    break;
                case 'left' :
                    currentX--;
                    break;
                case 'down' :
                    currentY--;
                    break;
                case 'right' :
                    currentX++;
                    break;     
                default:
                    error('setGridPoint(dir) must be given a string of "up", "left", "right" or "down".');    
            }
            // Add up any adjacent values to get the currentNum:
            var adjCounts = 0;
            // Check point down+left:
            if (typeof grid[currentX-1] != "undefined") {
                if (typeof grid[currentX-1][currentY-1] != "undefined") {
                    adjCounts += grid[currentX-1][currentY-1] 
                }
            }; 
            // Check point directly left:
            if (typeof grid[currentX-1] != "undefined") {
                if (typeof grid[currentX-1][currentY] != "undefined"){
                   adjCounts += grid[currentX-1][currentY]  
                }
            }; 
            // Check point up+left:
            if (typeof grid[currentX-1] != "undefined") {
                if (typeof grid[currentX-1][currentY+1] != "undefined"){
                   adjCounts += grid[currentX-1][currentY+1]  
                }
            }; 
            // Check point directly up:
            if (typeof grid[currentX] != "undefined") {
                if (typeof grid[currentX][currentY+1] != "undefined"){
                    adjCounts += grid[currentX][currentY+1]    
                }
            }; 
            // Check point up+right:
            if (typeof grid[currentX+1] != "undefined") {
                if (typeof grid[currentX+1][currentY+1] != "undefined"){
                    adjCounts += grid[currentX+1][currentY+1] 
                }
            }; 
            // Check point directly right:
            if (typeof grid[currentX+1] != "undefined") {
                if (typeof grid[currentX+1][currentY] != "undefined"){
                    adjCounts += grid[currentX+1][currentY]   
                }
            }; 
            // Check point down+right:
            if (typeof grid[currentX+1] != "undefined") {
                if (typeof grid[currentX+1][currentY-1] != "undefined"){
                    adjCounts += grid[currentX+1][currentY-1]   
                }
            }; 
            // Check point directly down:
            if (typeof grid[currentX] != "undefined") {
                if (typeof grid[currentX][currentY-1] != "undefined") {
                    adjCounts += grid[currentX][currentY-1]
                }                 
            }; 
            currentNum = adjCounts;
            // Initialize if needed:
            if(typeof grid[currentX] == "undefined") { grid[currentX] = [] }
            // And finally set our point value:
            grid[currentX][currentY] = currentNum;
        }

        
        while (currentNum <= data) {
            // Move up as necessary:
            for (i = 0; i < (2*c-1); i++ ) {
                if (currentNum > data) {break}
                setGridPoint('up');
            }
            // Move left as necessary:
            for (i = 0; i < (2*c); i++) {
                if (currentNum > data) {break}
                setGridPoint('left');
            }
            // Move down as necessary:
            for (i = 0; i < (2*c); i++) {
                if (currentNum > data) {break}
                setGridPoint('down');
            }
            // Move right as necessary, including an extra move right to start next concentric square:
            for (i = 0; i < (2*c+1); i++) {
                if (currentNum > data) {break}
                setGridPoint('right');
            }
            // Time to start a new square:
            c++;
        }

        return currentNum;
    

    } else {
        error('solution function must receive 1 or 2');
    }
    
}







// OUTPUTTING OUR SOLUTION:
console.log("Your solution for DAY 3 PART 1 should be... *drumroll*..." + solution(1));
console.log("Your solution for DAY 3 PART 2 should be... *drumroll*..." + solution(2));