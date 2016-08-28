'use strict'

overlay_library.add('fps', class extends Overlay {
    constructor(context) {
        super(context);
        this.frame_count = 1;
        this.speed = 1;
        this.infinity = true;

        this.actual = 0;
        this.counter = 0;
        this.interval = setInterval(this.updateFPS.bind(this), 1000);

    }
    
    updateFPS() {
        this.actual = this.counter;
        this.counter = 0;
    }

    finish() {
        super.finish();
        clearInterval(this.interval);
    }

    onUpdate(next_frame) {
    }

    onDraw() {
        this.context
        .drawText(this.actual + '', {
            destination: {
                position: [10, 10],
                size: [0, 0]
            },
            
            fontFamily: 'Consolas',
            fontSize: '40px',
            color: '#fff',
            opacity: 1
        });

        this.counter += 1;
    }
});