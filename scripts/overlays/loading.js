'use strict'

overlay_library.add('loading', class extends Overlay {
    constructor(context, {speed = 20, dots=3} = {}) {
        super(context);
        this.frame = 0;
        this.frame_count = dots+1;
        this.iteration = 0;
        this.speed = speed;
        this.infinity = true;

        this.text = "Loading" + ".".repeat(this.frame);
    }

    onUpdate(next_frame) {
        if(!next_frame) return;

        this.text = "Loading" + ".".repeat(this.frame);
    }

    onDraw() {
        this.context
        .drawRectangle({
            destination: {
                position: [0, 0],
                size: [this.context.width(), this.context.height()]
            },
            
            color: '#fff',
            opacity: 0.6
        })
        .drawText(this.text, {
            destination: {
                position: [this.context.width()/2, this.context.height()/2],
                size: [0, 0]
            },

            color: '#000',
            fontSize: '70px',
            fontWeight: 'normal',
            fontFamily: 'Geo',
            textAlign: 'center',
            textBaseline: 'center',
            opacity: 1
        });
    }
});