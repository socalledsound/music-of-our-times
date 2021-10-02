class Game {
    constructor(numCircles, startButton){
        this.numCircles = numCircles
        this.flatLine = false
        this.circlesData = generateCircles(this.numCircles)
        this.overload = false
        this.started = false
        this.startButton = startButton
        console.log(this.startButton)

    }

    init = () =>{
        this.circles = Array.from({length: numCircles}, (el, idx) => 
        new CircleThing(this.circlesData[idx]))  
        this.started = true
    }

    checkOverload(){
        this.circles.forEach( circle => {
            if(circle.size > window.innerWidth/2){
                this.overload = true
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

    circlesToFlatline(){
        this.circles.forEach(circle => {
            circle.y = window.innerHeight/2
        })
    }

    circlesToOriginalPositions(){
        this.circles.forEach((circle,idx) => {
            circle.x = this.circlesData[idx].x
            circle.y = this.circlesData[idx].y
        })
    }


    checkClick(mX, mY){
        this.circles.forEach(circle => {
            
            if(dist(mX, mY, circle.position.x, circle.position.y) < circle.size/2){
                circle.clicked = true
            }
        })        
    }

    checkCollisions(){
        this.circles.forEach((circleToCheck, idx) => {
            this.circles.forEach((circle, i) => {
                if(i !== idx){
                    if(circle.size > 20 && circleToCheck.size > 20){
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
        // this.flatline = toggle
        // //console.log(this.flatline)
        // if(this.flatline){
        //    this.circlesToFlatline()
        // }else {
        //     this.circlesToOriginalPositions()
        // }

        if(!this.overload){
            this.checkCollisions()

            this.circles.forEach(circle => {
                circle.move()
            })
        }
       
    }
    
}


