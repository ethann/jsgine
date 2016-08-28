/** GAME **/
Game = {};

Game.init = function() {
    Game.width = 400;
    Game.height = 600;
    Game.started = false;
    Game.loaded = false;
    Game.timer = null;
    Game.newObjectId = 0;

    // items
    Game.overlays = [];
    Game.items = [];

    // resources
    Game.images = {};
    
    // fps
    Game.FPS = {};
    Game.FPS.max = 50;
    Game.FPS.timeForFrame = 1000/Game.FPS.max;

    // handle delay issue
    Game.time = 0;
    Game.handleDelay = 0;
    
    // set canvas handle
    Game.$Canvas = document.querySelector('canvas#GameArea');
    Game.gCanvas = new Canvas(Game.$Canvas);
    Game.gCanvas.init();
    
    // mouse
    Game.mouse = {x: 0, y: 0};

    // keyboard
    Game.keyboard = [];
    
    // loader    
    Game.loader = new Loader(Game.gCanvas);
    Game.loader.add(sprite_library.getImagesToLoad());
    Game.loader.add("objects/blue_orb");
    Game.loader.add("interface/cursor-default");
    Game.loader.start(Game.complete);

    // apply overlays    
    Game.loading_overlay = new (overlay_library.getOverlay('loading'))(Game.gCanvas);
    Game.fps_overlay = new (overlay_library.getOverlay('fps'))(Game.gCanvas);
    Game.pushItem(Game.loading_overlay);
    Game.pushItem(Game.fps_overlay);

    Game.start();
};

Game.complete = function(images) {
    Game.images = images;

    sprite_library.load(Game.images);
    Game.loading_overlay.finish();

    Game.loaded = true;
};




Game.pushItem = function(item) {
    return Game.items.pushLog(item);
};

Game.replaceItem = function(item) {
    if(Game.items.removeLog(item)) {
        Game.items.pushLog(item);
        return true;
    }

    return false;
};

Game.removeItem = function(item) {
    return Game.items.removeLog(item);
};





/******************\
    MOUSE EVENTS
\******************/
    
Game.updateMousePosition = function(event) {
    let offCanvas = Game.$Canvas.getBoundingClientRect();
    let mouseX = (event.clientX - offCanvas.x);
    let mouseY = (event.clientY - offCanvas.y);
    Game.mouse = {x: mouseX, y:mouseY};
}

Game.mouseDown = function(event) {
    Game.updateMousePosition(event);
    Game.mouse_clicked = true;
};

Game.mouseUp = function(event) {
    Game.updateMousePosition(event);
    Game.mouse_clicked = false;
};

Game.mouseMove = function(event) {
    Game.updateMousePosition(event);
};

Game.keyDown = function(event) {
	let index = Game.keyboard.indexOf(event.keyCode);
	if(index === -1)
		Game.keyboard.push(event.keyCode);
};

Game.keyUp = function(event) {
	let index = Game.keyboard.indexOf(event.keyCode);
	if(index !== -1)
		Game.keyboard.splice(index, 1);
};




Game.drawBackground = function() {
    Game.gCanvas.drawRectangle({
        destination: {
            position: [0, 0],
            size: [Game.width, Game.height]
        },
        color: "gray"
    });
};

Game.drawCursor = function() {
    if(!Game.loaded) return;

    Game.gCanvas.drawImage({
        image: Game.images['interface/cursor-default'],
        destination: {
            size: [32, 32],
            position: [Game.mouse.x-10, Game.mouse.y-2]
        },
        source: {
            size: [16, 16],
            position: [Game.mouse_clicked?16:0, 0]
        }
    });
};



/**************************\
    GAME STATE FUNCTIONS
\**************************/


Game.stop = function() {
    if(!Game.started) 
        return;

    Game.started = false;
    disableEvents();

    clearTimeout(Game.timer);
    Game.timer = null;

    Game.$Canvas.style.cursor = 'default';
};

Game.start = function(type) {
    if(Game.started)
        return;
        
    Game.reset();
    Game.$Canvas.style.cursor = 'none';
    
    Game.started = true;
    Game.enableEvents();
    Game.proceed();
};

Game.reset = function() {
    Game.time = new Date().getTime();
    Game.handleDelay = 0;
    Game.newObjectId = 0;
};

Game.enableEvents = function() {
    Game.gCanvas.self.addEventListener('mousedown', Game.mouseDown);
    Game.gCanvas.self.addEventListener('mouseup', Game.mouseUp);
    Game.gCanvas.self.addEventListener('mousemove', Game.mouseMove);
    document.addEventListener('keydown', Game.keyDown);
    document.addEventListener('keyup', Game.keyUp);
};

Game.disableEvents = function() {
    Game.gCanvas.self.removeEventListener('mousedown');
    Game.gCanvas.self.removeEventListener('mouseup');
    Game.gCanvas.self.removeEventListener('mousemove');
    document.removeEventListener('keydown');
    document.removeEventListener('keyup');
};

Game.updateItems = function() {
    for(let item of Game.items) {
        item.update();

        if(item.update_z && this.update_z !== false) {
            Game.removeItem(item);
            item.zUpdated();
            Game.pushItem(item);
        }
    }
};

Game.drawItems = function() {
    for(let item of Game.items)
        item.draw();
};

Game.logic = function() {
    // handle item logic
    Game.updateItems();
};

Game.draw = function() {
    Game.gCanvas.clear();

    Game.drawItems();
    Game.drawCursor();
};

Game.proceed = function() {
    Game.logic();
    Game.draw();
    Game.doHandleDelay();
        
    if(Game.started)
        Game.timer = setTimeout(Game.proceed, Game.FPS.timeForFrame);
};

Game.doHandleDelay = function() {
    let time_now = new Date().getTime();

    Game.handleDelay += time_now - Game.time - Game.FPS.timeForFrame;
    Game.handleDelay = Math.min(Game.handleDelay, 5000); // 5s
    
    Game.time = time_now;
    while (Game.handleDelay > 0) {
        Game.logic();
        Game.draw();
        Game.handleDelay -= Game.FPS.timeForFrame;
    }
};

document.addEventListener('DOMContentLoaded', Game.init);
