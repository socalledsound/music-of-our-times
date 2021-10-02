class CircleThing {
    constructor({x, y, size}){
        // vectors are a way to store two related values in one variable
        // they're actually more than that but that's probably enough on them for now
        this.position = createVector(x, y)
        this.size = size
        this.color= getRandomColor()
        this.clicked = false
        // this.velocity = createVector(0, 0)
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(3);
        this.acceleration = createVector(0,0)
        this.friction = createVector(0.7,0.7)
        this.m = this.size/10
        this.sound = new FMsound(this.size)
    }

    // for a while i had some acceleration stuff in here
    addForce(){
        console.log()   
    }

    //and some friction, which is the opposite of acceleration
    addFriction(){
        //this.acceleration.mult(this.friction)
    }

    calculateNewTrajectory(){

    }

    // check the edges and reverse if at the edge
    checkBoundaryCollision() {
        if (this.position.x > width - this.size/2) {
          this.position.x = width - this.size/2;
          this.velocity.x *= -1;
        } else if (this.position.x < this.size/2) {
          this.position.x = this.size/2;
          this.velocity.x *= -1;
        } else if (this.position.y > height - this.size/2) {
          this.position.y = height - this.size/2;
          this.velocity.y *= -1;
        } else if (this.position.y < this.size/2) {
          this.position.y = this.size/2;
          this.velocity.y *= -1;
        }
      }


    // checkEdges(){
    //     if (this.position.x < -this.size){
    //         this.position.x = width + this.size
    //     }
    //     if (this.position.y < -this.size) {
    //         this.position.y = height + this.size
    //     }
    //     if (this.position.x > width + this.size) {
    //         this.position.x = -this.size
    //     }
    //     if (this.position.y > height + this.size){
    //         this.position.y = -this.size
    //     }
    // }
    checkCollision(circle){
        if(dist(circle.position.x, 
                circle.position.y, 
                this.position.x,
                this.position.y) < this.size){
                    //this.velocity.mult(-1,-1)
                    //this.acceleration.mult(0.01,0.01)
                    //this.position.add(random(-circleSize/5, circleSize/5),random(-circleSize/5, circleSize/5))
                    this.calculateNewTrajectory()
                    this.evolve()
                }   
    }

    // this is some very cool trig that calculates new trajectories 
    // for each ball after contact.  there are nice comments that aren't mine
    checkCollisionBorrowed(other) {
        // Get distances between the balls components
        let distanceVect = p5.Vector.sub(other.position, this.position);
    
        // Calculate magnitude of the vector separating the balls
        let distanceVectMag = distanceVect.mag();
    
        // Minimum distance before they are touching
        let minDistance = this.size/2 + other.size/2;
    
        if (distanceVectMag < minDistance) {
            this.sound.playSound()
          let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
          let d = distanceVect.copy();
          let correctionVector = d.normalize().mult(distanceCorrection);
          other.position.add(correctionVector);
          this.position.sub(correctionVector);
    
          // get angle of distanceVect
          let theta = distanceVect.heading();
          // precalculate trig values
          let sine = sin(theta);
          let cosine = cos(theta);
    
          /* bTemp will hold rotated ball this.positions. You 
           just need to worry about bTemp[1] this.position*/
          let bTemp = [new p5.Vector(), new p5.Vector()];
    
          /* this ball's this.position is relative to the other
           so you can use the vector between them (bVect) as the 
           reference point in the rotation expressions.
           bTemp[0].this.position.x and bTemp[0].this.position.y will initialize
           automatically to 0.0, which is what you want
           since b[1] will rotate around b[0] */
          bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
          bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;
    
          // rotate Temporary velocities
          let vTemp = [new p5.Vector(), new p5.Vector()];
    
          vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
          vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
          vTemp[1].x = cosine * other.velocity.x + sine * other.velocity.y;
          vTemp[1].y = cosine * other.velocity.y - sine * other.velocity.x;
    
          /* Now that velocities are rotated, you can use 1D
           conservation of momentum equations to calculate 
           the final this.velocity along the x-axis. */
          let vFinal = [new p5.Vector(), new p5.Vector()];
    
          // final rotated this.velocity for b[0]
          vFinal[0].x =
            ((this.m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) /
            (this.m + other.m);
          vFinal[0].y = vTemp[0].y;
    
          // final rotated this.velocity for b[0]
          vFinal[1].x =
            ((other.m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) /
            (this.m + other.m);
          vFinal[1].y = vTemp[1].y;
    
          // hack to avoid clumping
          bTemp[0].x += vFinal[0].x;
          bTemp[1].x += vFinal[1].x;
    
          /* Rotate ball this.positions and velocities back
           Reverse signs in trig expressions to rotate 
           in the opposite direction */
          // rotate balls
          let bFinal = [new p5.Vector(), new p5.Vector()];
    
          bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
          bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
          bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
          bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;
    
          // update balls to screen this.position
          other.position.x = this.position.x + bFinal[1].x;
          other.position.y = this.position.y + bFinal[1].y;
    
          this.position.add(bFinal[0]);
    
          // update velocities
          this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
          this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
          other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
          other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
          this.evolve(other.size, other.color)
         
        }
      }



    evolve(otherSize, otherColor){
        console.log(this.color, otherColor)
        // this makes the colors move towards each other
        this.color = lerpColor(color(this.color), color(otherColor), 0.5)
        // make the balls bigger after collision
        // sometimes they get locked together as a result
        this.size +=0.5
        console.log('should update sound here')
        // this combines the sounds of colliding balls 
        // so that they each modulate each other
        this.sound.update(otherSize)
        if(this.size < 20){
            this.size = 0
        }
    }

    move(){
        //this.addForce()
        //this.addFriction()
        //this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.checkBoundaryCollision()
        //this.checkEdges()
    }

    render(){
        if(!this.clicked){
            fill(this.color)
            
            ellipse(this.position.x, this.position.y, this.size, this.size)
            
            
        }
       
    }
}