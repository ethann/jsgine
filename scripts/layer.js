'use strict'

class Layer {
    constructor(parent) {
        this.parent = parent;
        this.context = null;

        // todo: create canvas
    }

    init() {
        this.context = this.self.getContext('2d');
        this.disableSmoothing();
    }

    disableSmoothing() {
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    }

    width() {
        return this.self.getBoundingClientRect().width;
    };

    height() {
        return this.self.getBoundingClientRect().height;
    };
    
    clear() {
        this.context.clearRect(0, 0, this.self.width, this.self.height);
        
        return this;
    }

    drawImage({
        image = null,
        src = null,
        dest = null,
        opacity = 1,
        shadowColor = '#000',
        shadowBlur = '1px',
        shadowX = '0',
        shadowY = '0',
        strokeOnly = false,
        strokeStyle = '#000',
        strokeWidth = 0
    } = {}) {
        if(image === null)  {
            console.error("Unable to draw image. No image.");
            return;
        }

        this.context.globalAlpha = opacity;
        this.context.shadowColor = shadowColor;
        this.context.shadowOffsetX = shadowX;
        this.context.shadowOffsetY = shadowY;
        this.context.shadowBlur = shadowBlur;
        
        this.context.drawImage(image, 
            ...src.pos, ...src.size,
            ...dest.pos, ...dest.size);
        
        return this;
    }
    
    drawText(text, {
        position = null,
        opacity = 1,
        family = 'Consolas',
        weight = 'normal',
        size = '14px',
        align = 'left',
        baseline = 'left',
        shadowColor = '#000',
        shadowBlur = '1px',
        shadowX = '0',
        shadowY = '0',
        strokeOnly = false,
        strokeStyle = '#000',
        strokeWidth = 0
    } = {}) {
        // if it's a number then convert it to string
        if(typeof text !== 'string')
            text = text.toString();
            
        this.context.globalAlpha = opacity;
        this.context.textAlign = align;
        this.context.textBaseline = baseline;
        this.context.fillStyle = color;
        this.context.shadowColor = shadowColor;
        this.context.shadowBlur = shadowBlur;
        this.context.shadowOffsetX = shadowX;
        this.context.shadowOffsetY = shadowY;
        this.context.font = weight + " " + size + " " + family;
        
        if(!strokeOnly)
            this.context.fillText(text, ...position);
        
        if(strokeWidth > 0) {
            this.context.strokeStyle = strokeStyle;
            this.context.lineWidth = strokeWidth;
            this.context.strokeText(text, ...position);
        }
        
        
        return this;
    };
    
    textWidth(text, {
        position = null,
        size = '14px',
        weight = 'normal',
        family = 'Consolas'
    } = {}) {
        // if it's a number then convert it to string
        if(typeof text !== 'string')
            text = text.toString();
        
        this.context.font = weight + " " + size + " " + family;
        let metrics = this.context.measureText(text);
        
        return metrics.width;
    };
    
    drawCircle({
        position = null, 
        radius = 1, 
        opacity = 1,
        color = '#000'
    } = {}) {
        if(radius <= 0)
            return this;
    
        this.context.beginPath();
        this.context.globalAlpha = opacity;
        this.context.arc(...position, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        
        return this;
    }
    
    drawRectangle({
        position = null,
        size = [1, 1],
        opacity = 1,
        color = '#000'
    } = {}) {

        this.context.beginPath();
        this.context.globalAlpha = opacity;
        this.context.rect(...position, ...size);
        this.context.fillStyle = color;
        this.context.fill();
        
        return this;
    }
}

// Layer.prototype.defaultStyle = {
//     opacity: 1,
//     image: null,
    
//     // source
//     source: {
//         position: [0, 0],
//         size: [0, 0]
//     },
    
//     // destination
//     destination: {
//         position: [0, 0],
//         size: [0, 0]
//     },
    
//     // text
//     color: '#000000',
//     fontSize: '12px',
//     fontWeight: 'normal',
//     fontFamily: 'sans-serif',
//     textAlign: 'left',
//     textBaseline: 'top',
    
//     shadowColor: "black",
//     shadowOffsetX: 0,
//     shadowOffsetY: 0,
//     shadowBlur: 0,
    
//     strokeStyle: '#000000',
//     strokeWidth: 0,
//     strokeOnly: 0,
    
//     // shapes
//     radius: 0
// };
