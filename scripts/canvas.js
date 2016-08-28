// needs jQ

function Canvas(canvasElement) {
	this.self = canvasElement;
	this.context = null;
	this.defaultStyle = null;
	
	this.init = function() {
		this.context = this.self.getContext('2d');
		this.disableSmoothing();
		this.defaultStyle = {
			opacity: 1,
			image: null,
			
			// source
			source: {
				position: [0, 0],
				size: [0, 0]
			},
			
			// destination
			destination: {
				position: [0, 0],
				size: [0, 0]
			},
			
			// text
			color: '#000000',
			fontSize: '12px',
			fontWeight: 'normal',
			fontFamily: 'sans-serif',
			textAlign: 'left',
			textBaseline: 'top',
			
			shadowColor: "black",
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowBlur: 0,
			
			strokeStyle: '#000000',
			strokeWidth: 0,
			strokeOnly: 0,
			
			// shapes
			radius: 0
		};
		
		this.objectList = {};
	};

	this.disableSmoothing = function() {
		this.context.mozImageSmoothingEnabled = false;
		this.context.webkitImageSmoothingEnabled = false;
		this.context.msImageSmoothingEnabled = false;
		this.context.imageSmoothingEnabled = false;
	};

	this.width = function() {
		return this.self.getBoundingClientRect().width;
	};

	this.height = function() {
		return this.self.getBoundingClientRect().height;
	};
	
	this.objectsClear = function() {
		this.objectList = {};
	};
	
	this.objectsAdd = function(object) {
		if(this.objectList[object.z] == undefined)
			this.objectList[object.z] = [];
		
		this.objectList[object.z].push(object);
		return this;
	};
	
	this.objectsDraw = function() {
		var keys = Object.keys(this.objectList);
		for(var i =0, len=keys.length; i<len; i++) 
			keys[i] = parseInt(keys[i]);
		
		keys.sort(function(a,b){return a-b;});
		
		for(var k in keys) {
			var key = keys[k];
			
			for(var i=0, len=this.objectList[key].length; i<len; i++) {
				switch(this.objectList[key][i].type) {
					case 'image':
						this.drawImage(this.objectList[key][i].style);
						break;
						
					case 'text':
						this.drawText(this.objectList[key][i].text, this.objectList[key][i].style);
						break;
						
					case 'circle':
						this.drawCircle(this.objectList[key][i].style);
						break;
						
					case 'rectangle':
						this.drawRectangle(this.objectList[key][i].style);
						break;
						
					default:
						// TODO: output error/ unknown type
						console.error("Canvas: Unknown object type.")
				}
			}
		}
	};
	
	
	
	
	this.checkDestSize = function(style) {
		if(calcRectArea(style.destination.size) === 0)
			style.destination.size = [...style.source.size];
	};
	
	this.clear = function() {
		this.context.clearRect(0, 0, this.self.width, this.self.height);
		
		return this;
	}

	this.drawImage = function(ownStyle) {
		var style = extend({}, this.defaultStyle, ownStyle);
		if(style.image === null)  {
			console.error("Unable to draw image. No image.");
			return;
		}
			
		this.checkDestSize(style);
		
		this.context.globalAlpha = style.opacity;
		this.context.shadowColor = style.shadowColor;
		this.context.shadowOffsetX = style.shadowOffsetX;
		this.context.shadowOffsetY = style.shadowOffsetY;
		this.context.shadowBlur = style.shadowBlur;
		
		this.context.drawImage(style.image, 
			...style.source.position, ...style.source.size,
			...style.destination.position, ...style.destination.size);
		
		return this;
	};
	
	this.drawText = function(text, ownStyle) {
		var style = extend({}, this.defaultStyle, ownStyle);
		
		// if it's a number then convert it to string
		if(typeof text === 'number')
			text = text.toString();
		
		// if it's another type than string or it's null or empty string then return
		if(text == null || typeof text !== 'string' || text.length <= 0 || style.fontSize <= 0) 
			return this;
			
		this.context.globalAlpha = style.opacity;
		this.context.textAlign = style.textAlign;
		this.context.textBaseline = style.textBaseline;
		this.context.fillStyle = style.color;
		this.context.shadowColor = style.shadowColor;
		this.context.shadowOffsetX = style.shadowOffsetX;
		this.context.shadowOffsetY = style.shadowOffsetY;
		this.context.shadowBlur = style.shadowBlur;
		this.context.font = style.fontWeight + " " + style.fontSize + " " + style.fontFamily;
		
		if(style.strokeOnly == 0) {
			this.context.fillText(text, ...style.destination.position);
		}
		
		if(style.strokeWidth > 0) {
			this.context.strokeStyle = style.strokeStyle;
			this.context.lineWidth = style.strokeWidth;
			this.context.strokeText(text, ...style.destination.position);
		}
		
		
		return this;
	};
	
	this.textWidth = function(text, ownStyle) {
		var style = extend({}, this.defaultStyle, ownStyle);
		
		// if it's a number then convert it to string
		if(typeof text == 'number')
			text = text.toString();
		
		// if it's another type than string or it's null or empty string then return
		if(text == null || typeof text != 'string' || text.length <= 0 || style.fontSize <= 0) 
			return {width: 0, height: 0};
			
		this.context.font = style.fontWeight + " " + style.fontSize + " " + style.fontFamily;
		var metrics = this.context.measureText(text);
		
		return metrics.width;
	};
	
	this.drawCircle = function(ownStyle) {
		var style = extend({}, this.defaultStyle, ownStyle);
		
		if(style.radius <= 0) 
			return this;
	
		this.context.beginPath();
		this.context.globalAlpha = style.opacity;
		this.context.arc(...style.destination.position, style.radius, 0, 2 * Math.PI, false);
		this.context.fillStyle = style.color;
		this.context.fill();
		
		return this;
	};
	
	this.drawRectangle = function(ownStyle) {
		var style = extend({}, this.defaultStyle, ownStyle);
		
		if(calcRectArea(style.destination.size) <= 0)
			return this;
	
		this.context.beginPath();
		this.context.globalAlpha = style.opacity;
		this.context.rect(...style.destination.position, ...style.destination.size);
		this.context.fillStyle = style.color;
		this.context.fill();
		
		return this;
	};
};