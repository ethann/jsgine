function CountdownOverlay() {
    this.step = Game.FPS.max*10;
    this.opacity = 1;
    this.opacityDelta = 0.1;

    this.isDone = function() {
        return this.step <= 0;
    };

    this.reset = function() {
        this.step = Game.FPS.max*3;
        this.opacity = 0.8;
        this.opacityDelta = this.opacity/this.startCountdown;
    };

    this.draw = function() {
        Game.gCanvas.objectsAdd({
            type: 'rectangle',
            z: 5000,
            style: {
                x: 0, y: 0,
                color: '#fff',
                width: Game.width, height: Game.height,
                opacity: this.opacity
            }
        });
        
        this.opacity -= this.opacityDelta;
        
        if(this.step % Game.FPS.max == 0) {
            Game.addAnimatedText(this.step/Game.FPS.max, {
                color: '#000',
                fontSize: '70px',
                fontWeight: 'normal',
                fontFamily: 'Geo',
                textAlign: 'center',
                textBaseline: 'top',
                
                animationTime: Game.FPS.max,
                
                fadeInTime: 5,
                fadeOutTime: Game.FPS.max-20,
                
                startMoveTime: 0,
                endMoveTime: Game.FPS.max,
                endX: 200,
                endY: 0
            }, 200, 20, 5001);
        }
        
        
        this.step--;
        if(this.step == 0) {
            Game.addAnimatedText('Start!', {
                color: '#000',
                fontSize: '70px',
                fontWeight: 'normal',
                fontFamily: 'Geo',
                textAlign: 'center',
                textBaseline: 'top',
                
                animationTime: Game.FPS.max,
                
                fadeInTime: 5,
                fadeOutTime: Game.FPS.max-20,
                
                startMoveTime: 0,
                endMoveTime: Game.FPS.max,
                endX: 200,
                endY: 0
            }, 200, 20, 5001);
        }
    };
}