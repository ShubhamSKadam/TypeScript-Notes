"use strict";
// **********************************************
// ******************* PART 1 *******************
// **********************************************
// Create a variable called highScore that can be a number OR a boolean
let highScore = 34;
highScore = false;
// **********************************************
// ******************* PART 2 *******************
// **********************************************
// create an array called stuff
// it can be an array of numbers OR an array of strings
// it cannot be an array of numbers and strings (mixed together)
let stuff = [1, 2, 3];
stuff = ["abc", "xyz"];
// for combined
let stuffCombined = [1, 2, "shubham"];
// Create an array called colors that can hold a mixture of RGB and HSL color types
let colors = [];
// **********************************************
// ******************* PART 6 *******************
// **********************************************
// Write a function called greet that accepts a single string OR an array of strings
// It should print "Hello, <name>" for that single person OR greet each person in the array with the same format
function greet(input) {
    if (typeof input === "string") {
        console.log(`Hello, ${input}`);
    }
    else {
        input.map((user) => console.log(`Hello, ${user}`));
    }
}
