'use strict'

overlay_library.add('flash', class extends Overlay {
    constructor(context, {frames = 50, speed = 1, infinity = false} = {}) {
        super(context);
        this.frame_count = frames;
        this.speed = speed;
        this.infinity = infinity;

        this.alpha_delta = 1/this.frame_count;
    }

    onUpdate(next_frame) {

    }

    onDraw() {
        this.context
        .drawRectangle({
            destination: {
                position: [0, 0],
                size: [this.context.width(), this.context.height()]
            },
            
            color: '#fff',
            opacity: 1-(this.alpha_delta*this.frame)
        });
    }
});