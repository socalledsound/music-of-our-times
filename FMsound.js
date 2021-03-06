class FMsound{
    // fm synthesis is a nice way to make pretty interesting sounds
    // one oscillator modulates the frequency of another one
    constructor(size){
        this.freq1 = size
        console.log(this.freq1)
        this.modFreq = size * 4
        this.osc1 = new p5.Oscillator('sine')
        this.osc1.freq(this.modFreq)
        this.osc1.amp(random(-300, 300))
        this.osc1.start()
        this.osc1.disconnect()
        this.osc2 = new p5.Oscillator('sine')
        //this.osc2.freq(this.fundamental)
        this.osc2.freq(this.freq1)
        this.osc2.freq(this.osc1)
        this.osc2.amp(0)
        this.osc2.start()
        this.playing = false
        this.playLength = size * 30
    
    }

    playSound = () => {
        if(!this.playing){
            console.log('triggered')
            this.osc2.amp(1.0, 0.1)
            setTimeout(this.stopSound, this.playLength)
            this.playing = true
        }
    
        
    }

    stopSound = () => {
        this.osc2.amp(0.0, 0.1)
        this.playing = false
    }

    update(size){    
        // modulates this sound with the size of the ball
        // that this ball just collided with
        this.modFreq = size * 4
        this.playLength = size * 3
        this.osc1.freq(this.modFreq)
        console.log('updating sound', this.freq1)
        this.osc2.freq(this.freq1 * this.osc1)
    }
}