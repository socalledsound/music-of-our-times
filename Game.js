class Game {
    constructor(numCircles, startButton){
        this.numCircles = numCircles
        this.flatLine = false
        // make the data ahead of time
        this.circlesData = generateCircles(this.numCircles)
        this.overload = false
        this.started = false
        this.startButton = startButton
        console.log(this.startButton)

    }

    init = () =>{
        // in case overload is true
        this.overload = false
        // make the circles here
        this.circles = Array.from({length: numCircles}, (el, idx) => 
        new CircleThing(this.circlesData[idx]))  
        // start the main loop
        this.started = true
    
    }

    checkOverload(){
        // once the circles are too big, end the game
        this.circles.forEach( circle => {
            if(circle.size > window.innerWidth/2){
                this.overload = true
                // after a certain period of time reset the game
                setTimeout(this.resetOverload, 2000)
            }
        })
    }

    resetOverload = () => {
    
        this.overload = false
        this.started = false
        console.log(this.overload)

        this.startButton.show()
    }

    // not using this anymore
    circlesToFlatline(){
        this.circles.forEach(circle => {
            circle.y = window.innerHeight/2
        })
    }
    // nor this, but maybe i'll bring it back at some point so i'll leave them here
    circlesToOriginalPositions(){
        this.circles.forEach((circle,idx) => {
            circle.x = this.circlesData[idx].x
            circle.y = this.circlesData[idx].y
        })
    }

    // also not using this
    checkClick(mX, mY){
        this.circles.forEach(circle => {
            
            if(dist(mX, mY, circle.position.x, circle.position.y) < circle.size/2){
                circle.clicked = true
            }
        })        
    }

    // this is a nested loop that checks each circle against every other circle
    checkCollisions(){
        this.circles.forEach((circleToCheck, idx) => {
            this.circles.forEach((circle, i) => {
                if(i !== idx){
                    if(circle.size > 20 && circleToCheck.size > 20){
                        // i borrowed this collision function from a p5 example
                        circle.checkCollisionBorrowed((circleToCheck))
                    }
                    
                }
            })
        })
    }

    render(){
        this.circles.forEach(circle => {
            circle.render()
        })
    }

    update(toggle){
        this.checkOverload()
        if(!this.overload){
            this.checkCollisions()
            this.circles.forEach(circle => {
                circle.move()
            })
        }

         // this.flatline = toggle
        // //console.log(this.flatline)
        // if(this.flatline){
        //    this.circlesToFlatline()
        // }else {
        //     this.circlesToOriginalPositions()
        // }
       
    }
    
}


