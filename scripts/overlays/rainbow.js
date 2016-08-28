'use strict'

overlay_library.add('rainbow', class extends Overlay {
    // Canvas context
    // { 
    //   ['#ffffff66', '#66337733'] colors
    //   boolean infinity
    // }
    constructor(context, {colors = [], infinity = false, frames = 100} = {}) {
        super(context);
        this.speed = 1;
        this.frame_count = frames;
        this.infinity = infinity;

        this.colors_delta = [];
        this.colors = [...colors];
        this.color = [0,0,0,0];

        this.init();
    }

    onUpdate(next_frame) {
        if(!next_frame) return;

        let phase = Math.max(0, Math.floor(this.frame  / this.frame_per_phase));

        if(phase >= this.colors_delta.length) return;

        for(let c = 0; c < 4; c += 1)
            this.color[c] = this.color[c] + this.colors_delta[phase][c];
    }

    onDraw() {
        let color = ensureColor(this.color);
        this.context
        .drawRectangle({
            destination: {
                position: [0, 0],
                size: [this.context.width(), this.context.height()]
            },
            
            color: convertToColor(color, false),
            opacity: color[3]/255
        });
    }

    init() {
        if(this.infinity)
            this.colors.push(this.colors[0]);

        this.alignFramesToPhases();

        // need at least 2 colors (From -> To)
        // or 3 colors if infinity (From -> To -> From)
        if(this.colors.length < 2 || (this.infinity && this.colors.length < 3))
            this.end = true;

        if(!this.end) {
            this.translateColors();
            this.calculatePhases();
        }

        this.color = [...this.colors[0]];
    }

    alignFramesToPhases() {
        let phase_count = (this.colors.length-1);
        this.frame_per_phase = Math.floor(this.frame_count / phase_count);
        this.frame_count = this.frame_per_phase * phase_count;
    }

    translateColors() {
        for(let c = 0; c < this.colors.length; c += 1)
            this.colors[c] = convertColor(this.colors[c]);
    }

    calculatePhases() {
        let calculateDelta = function(from, to, frames) {
            let sums = [0,0,0,0];
            for(let c = 0; c < 4; c += 1)
                sums[c] += Math.abs(from[c] - to[c]);

            return sums.map((x)=>(x/frames));
        };

        let calculateSign = function(from, to) {
            let signs = [];
            for(let c = 0; c < 4; c += 1)
                signs.push(Math.sign(to[c] - from[c]));

            return signs;
        };

        for(let i = 1; i < this.colors.length; i += 1) {
            let phase_delta = calculateDelta(
                this.colors[i-1], this.colors[i], this.frame_per_phase);
            
            let phase_signs = calculateSign(
                this.colors[i-1], this.colors[i]);

            for(let c = 0; c < 4; c += 1)
                phase_delta[c] = phase_delta[c] * phase_signs[c];

            this.colors_delta.push(phase_delta);
        }
    }
});