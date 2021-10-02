// these are some settings
const color1 = 40
const color2 = 220
const minCircleSize = 40
const maxCircleSize = 200
const numCircles = 10
// these are some things in the global state 
let game, startButton

function setup(){
    createCanvas(window.innerWidth, window.innerHeight)
    startButton = createButton('start')
    startButton.position(window.innerWidth/2 - 200, window.innerHeight/2 - 100)
    startButton.size(400,200)
    startButton.mousePressed(() => startGame(game))
    game = new Game(numCircles, startButton)

    //console.log(game)
}

function draw(){
    
    if(game.overload){
        background(220,10,0)
        
    }else{
        background(10)
        if(game.started){
            game.update()
            game.render()
        }
    }

    
}

// not using this at the moment
function mousePressed(){
    // if(!started){
    //     game.checkClick(mouseX, mouseY)
    // }
    
}



const startGame = (game) => {
    game.init()
    startButton.hide()  
    
}