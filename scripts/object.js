// _speed: fastest - 8, slowest - 1
class Object {
    constructor(id, context) {
        this.id = id;
        this.context = context;
        this.iteration = 0;
        this.destroyed = false;
        this.position = {
            x: 100,
            y: 100,
            z: 1000 // represented by y
        };

        this.sprite = null;
        this.size = 1;
        this.opacity = 1;
        this.update_z = false;
    }

    get z() {
    	return this.position.y;
    }

    set z(new_z) {
    	if(this.z != new_z)
    		this.update_z = new_z;
    }

    // name or class
    setSprite(sprite) {
    	let spriteobj = sprite;
    	if(typeof sprite === 'string')
    		spriteobj = sprite_library.getSprite(sprite);

    	if(spriteobj instanceof Sprite)
    		this.sprite = spriteobj;
    }

    setState(state) {
    	if(!this.sprite) return;

    	this.sprite.setState(state);
    }

    setPosition({x = this.position.x, y = this.position.y} = {}) {
    	this.position.x = x;

    	if(this.z != y)
    		this.update_z = y;
    }

    zUpdated() {
    	this.position.y = this.update_z;
    	this.update_z = false;
    }

    isDestroyed() { return this.destroyed; }
    destroy() { this.destroyed = true; }

    update() {
        if(this.isDestroyed())
            return;

        this.sprite.update();

        this.iteration += 1;
    }

    draw() {
    	this.sprite.draw(this.context, [this.position.x, this.position.y], this.size);
    	this.context.drawRectangle({
    		destination: {
    			size: [10, 10],
    			position: [this.position.x, this.position.y]
    		},

    		color: '#ff6688'
    	});
    }
}