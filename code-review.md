### Concepts and Methods Used
- createElement()
- appendChild()
- Array.from()
- includes()
- add()
- classList()
- remove()
- switch/case/break
- dot notation vs braket notation 
- innerHTML()
- clearInterval()
- setTimeInterval()

### Code Review
0. Create gird 
1. Create the invaders on the grid
2. Remove invader from grid
3. Add shooter position
4. Move shooter position
5. Move invader position
6. Shoot

 ### Set Variables
 ```js
const grid = document.querySelector('.grid') // game will show here
const resultsDisplay = document.querySelector('.results') // display score 
let currentShooterIndex = 202 // set default position on grid for shooter 
let width = 15 // width of grid 
let direction = 1 // move 1 direction 
let invadersId // declare var for later use and global access
let goingRight = true // set default to true
let aliensRemoved = [] // declare for later use 
let results = 0 // delclare for later use
 ```

 ### Create the grid
 ```js
 // The grid is 15x15 w/ an area of 225
for (let i = 0; i < 225; i++){
    const square = document.createElement('div')// create a div every loop
    grid.appendChild(square) // new div `square` becomes child of grid
}
 ```

 ### Create a shallow copy of array 

 ```js
const squares = Array.from(document.querySelectorAll('.grid div'))
 ```


### Draw

```js
//  set default positoin of invader on grid
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

//  show invaders on grid 
function draw() {
    for (let i = 0; i < alienInvaders.length; i ++>){
        //if aliensRemoved does NOT include counter
        if(!aliensRemoved.includes(i)){
            // add the class invader for each loop
            squares[alienInvaders[i].classList.add('invader')]
        }
    }
}

// call function 
draw()
```

### Remove the invader from the grid
```js
function remove() {
    //loop the amount of alienInvaders
    for (let i =0; i< alienInvaders.length; i++) {
        // for every loop remove the class 'invader'
        sqaures[alienInvaders[i]].classList.remove('invader')
    }
}
```

### Add Shooter  positon on the grid 
```js 
// whatever the value currentShooterIndex currently holds will be the positon on the grid the shooter will be. 
squares[currentShoooterIndex].classList.add('shooter')
```

### Move the index of the shooter by keypress event listener
```js

// Moves shooter location on grid 
function moveShooter(e) {
    // removes shooter on grid
    squares[currentShooterIndex].classList.remove('shooter')
    // if event key property is 'ArrowLeft'
    switch(e.key){
        case 'ArrowLeft':
            // if the shooter location remaining width is NOT equal 0
            // move shooter location -1 left
            if(currentShooterIndex % width !== 0) currentShooterIndex -=1
            break 
    // if the event key property is 'ArrowRight'            
        case 'ArrowRight':
            // if the shooter locations remaining width less than width - 1
            // move shooter location 1 right       
            if(currentShooterIndex % width < width -1) currentShooterIndex += 1
            break
    }
    // add class shooter to currentShooterIndex for styles
    squares[currentShooterIndex].classList.add('shooter')
}
// add event listener for key action to fire moveShooter funtion
document.addEventListener('keydown', moveShooter)
```

### Move Invader left and right so that the invaders are not idle
```js 
function moveInvaders(){
    // Set the value of left edge
    const leftEdge = alienInvaders[0] % width === 0
    // Set the value of right edge 
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    remove() // clear invaders

// if goingRight meets rightEdge
    if(rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            // each invader will move right width by 1 💥
            alienInvaders[i] += width + 1
            
            direction = -1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvader[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    draw()

    if (squares[currentShooterIndex].classList.contains('invader','shooter')){
        resultsDisplay.innerHTML = 'GAMEOVER'
        clearInterval(invadersId)
    }

    for(let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > (squares.length)) {
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId)
        }
    }


    if (aliensRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invaderId)
    }
}

invadersId = setInterval(moveInvaders, 600)
```