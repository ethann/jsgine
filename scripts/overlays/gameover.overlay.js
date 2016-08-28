class GameOverOverlay() {
    constructor() {
        this.style = {};
        this.done = 0;
        this.DONEtime = 0;
        this.style.BGtime = Game.FPS.max*2;
        this.style.BGopacity = 0;
        this.style.BGopacityDelta = 0.6/this.style.BGtime;
        this.style.TEXTstart = Game.FPS.max;
        this.style.TEXTtime = Game.FPS.max;
        this.style.TEXTopacity = 0;
        this.style.TEXTopacityDelta = 1.0/this.style.TEXTtime;
    }

    isDone() {
        return this.done != 0;
    }

    reset() {
        this.done = 0;
        this.DONEtime = 0;
        this.style.BGtime = Game.FPS.max*2;
        this.style.BGopacity = 0;
        this.style.TEXTtime = Game.FPS.max;
        this.style.TEXTopacity = 0;
    }

    draw() {
        // if done
        if(this.done) {
            Game.gCanvas.objectsAdd({
                type: 'rectangle',
                z: 5000,
                style: {
                    x: 0, y: 0,
                    color: '#000000',
                    width: Game.width, height: Game.height,
                    opacity: this.style.BGopacity
                }
            })
            .objectsAdd({
                type: 'text',
                text: 'GAME OVER',
                z: 5000,
                style: {
                    x: Game.width/2, y: 20,
                    color: '#ffffff',
                    fontSize: '70px',
                    fontWeight: 'normal',
                    fontFamily: 'Geo',
                    textAlign: 'center',
                    textBaseline: 'top',
                    opacity: this.style.TEXTopacity
                }
            });
            
            return;
        }
        
        
        // else
        var action = 0;
        
        if(this.style.BGtime > 0) {
            this.style.BGopacity = Math.min(1, this.style.BGopacity + this.style.BGopacityDelta);
            this.style.BGtime--;
            action++;
        }
        
        if(this.DONEtime >= this.style.TEXTstart && this.style.TEXTtime > 0) {
            this.style.TEXTopacity = Math.min(1, this.style.TEXTopacity + this.style.TEXTopacityDelta);
            this.style.TEXTtime--;
            action++;
        }
        
        if(action == 0 && this.DONEtime > Game.FPS.max) {
            this.done = 1;
        }
        
        Game.gCanvas.objectsAdd({
            type: 'rectangle',
            z: 5000,
            style: {
                x: 0, y: 0,
                color: '#000000',
                width: Game.width, height: Game.height,
                opacity: this.style.BGopacity
            }
        })
        .objectsAdd({
            type: 'text',
            text: 'GAME OVER',
            z: 5000,
            style: {
                x: Game.width/2, y: 20,
                color: '#ffffff',
                fontSize: '70px',
                fontWeight: 'normal',
                fontFamily: 'Geo',
                textAlign: 'center',
                textBaseline: 'top',
                opacity: this.style.TEXTopacity
            }
        });
        
        // font size 70px Geo #FFFFFF
            
        this.DONEtime++;

    };
}