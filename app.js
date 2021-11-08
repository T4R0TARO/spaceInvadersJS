// Create and select default variables for later use
const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

// for every loop; create an element div and have the new become the a child of the grid variable 
for (let i = 0; i < 225; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

// Creates a shallow copy of the array 
const squares = Array.from(document.querySelectorAll('.grid div'))


// set default valules positions to the alien invaders on the grid 
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]
// create the invaders on the grid 
function draw() {
    for (let i = 0; i < alienInvaders.length; i++){
        if(!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }
    }
}
// call function
draw()

/**BOOKMARK
 * LCT: created space invaders on gameboard
 * TODO: create function that removes an invader
 * QUESTIONS: 
 */


// removes invader from grid by removing class name 

//adds the shooter position on the grid by add the class name 

// move the index of the shoot by key press event listener 

// moves invader left and right so that the invader are not idle

// shoot laser