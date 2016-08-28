function Platform(width, x, y) {
    this.id = Game.newObjectId++;
    this.ownIterate = 0;
    this.position = {};

    this.type = Game.TYPES.platforms.wood
    
    this.destroyed = false;
    
    this.opacity = 1; 

    this.width = 14 + 33*width;
    
    this.position.x = x;
    this.position.y = y;
    this.position.z = y;

    this.getHitarea = function(){
        return {
            position: {x: this.position.x, y: this.position.y+5, z: this.position.z},
            width: this.width + 14,
            height: 2,
            shape: 'rectangle'
        };
    };

    this.isDestroyed = function() { return this.destroyed; };
    this.destroy = function() { this.destroyed = true; };
        
    this.update = function() {
        if(this.isDestroyed())
            return;
            
        this.ownIterate++;
    };
    
    // debug purposes
    this.draw = function() {
        Game.gCanvas.drawImage({
            image: Game.images[this.type.image],
            x: this.position.x, y: this.position.y,
            width: this.type.left.size.width, height: this.type.left.size.height,
            swidth: this.type.left.size.width, sheight: this.type.left.size.height,
            sx: this.type.left.background_start.x, sy: this.type.left.background_start.y,
            opacity: this.opacity
        });

        for (var i = 0; i < (this.width-14)/33; i++) {
            Game.gCanvas.drawImage({
                image: Game.images[this.type.image],
                x: this.position.x + this.type.left.size.width + this.type.middle.size.width*i,
                y: this.position.y,
                width: this.type.middle.size.width, height: this.type.middle.size.height,
                swidth: this.type.middle.size.width, sheight: this.type.middle.size.height,
                sx: this.type.middle.background_start.x, sy: this.type.middle.background_start.y,
                opacity: this.opacity
            });
        }

        Game.gCanvas.drawImage({
            image: Game.images[this.type.image],
            x: this.position.x + this.width - this.type.right.size.width,
            y: this.position.y,
            width: this.type.right.size.width, height: this.type.right.size.height,
            swidth: this.type.right.size.width, sheight: this.type.right.size.height,
            sx: this.type.right.background_start.x, sy: this.type.right.background_start.y,
            opacity: this.opacity
        });
    };
    
    this.addToDraw = function() {
        Game.gCanvas.objectsAdd({
            z: 1,
            type: 'image',
            style: {
                image: Game.images[this.type.image],
                x: this.position.x, y: this.position.y,
                width: this.type.left.size.width, height: this.type.left.size.height,
                swidth: this.type.left.size.width, sheight: this.type.left.size.height,
                sx: this.type.left.background_start.x, sy: this.type.left.background_start.y,
                opacity: this.opacity
            }
        });

        for (var i = 0; i < (this.width-14)/33; i++) {
            Game.gCanvas.objectsAdd({
                z: 1,
                type: 'image',
                style: {
                    image: Game.images[this.type.image],
                    x: this.position.x + this.type.left.size.width + this.type.middle.size.width*i,
                    y: this.position.y,
                    width: this.type.middle.size.width, height: this.type.middle.size.height,
                    swidth: this.type.middle.size.width, sheight: this.type.middle.size.height,
                    sx: this.type.middle.background_start.x, sy: this.type.middle.background_start.y,
                    opacity: this.opacity
                }
            });
        }

        Game.gCanvas.objectsAdd({
            z: 1,
            type: 'image',
            style: {
                image: Game.images[this.type.image],
                x: this.position.x + this.width - this.type.right.size.width,
                y: this.position.y,
                width: this.type.right.size.width, height: this.type.right.size.height,
                swidth: this.type.right.size.width, sheight: this.type.right.size.height,
                sx: this.type.right.background_start.x, sy: this.type.right.background_start.y,
                opacity: this.opacity
            }
        });
    };

}