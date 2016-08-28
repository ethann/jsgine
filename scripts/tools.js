// this library should be independent!

/** TOOLS **/
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(needle) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === needle) {
                return i;
            }
        }
        return -1;
    };
}

// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
var extend = function () {
    
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    // Check if a deep merge
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
        deep = arguments[0];
        i++;
    }

    // Merge the object into the extended object
    var merge = function (obj) {
        for ( var prop in obj ) {
            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                // If deep merge and property is an object, merge properties
                if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                    extended[prop] = extend( true, extended[prop], obj[prop] );
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
        var obj = arguments[i];
        merge(obj);
    }

    return extended;

};

// [0-255, 0-255, 0-255, 0-255] color
function ensureColor(color) {
    return color.map(function(val) {
        val = Math.abs(Math.round(val));
        if(val < 0) val = 0;
        if(val > 255) val = 255;

        return val;
    });
}

function convertColor(color) {
    let rgb_reg = /^\s*rgb\(\s*\d{1,3}(\s*,\s*\d{1,3}){2}\)\s*$/i;
    let rgba_reg = /^\s*rgba\(\s*\d{1,3}(\s*,\s*\d{1,3}){3}\)\s*$/i;
    let rgb_html_reg = /^\s*#([0-9a-f]{2}){3}\s*$/i;
    let rgba_html_reg = /^\s*#([0-9a-f]{2}){4}\s*$/i;

    if(rgb_reg.test(color)) {
        return ensureColor(color.match(/[0-9]+/g).map((x)=>parseInt(x))).concat(255);
    }
    else if(rgba_reg.test(color)) {
        return ensureColor(color.match(/[0-9]+/g).map((x)=>parseInt(x)));
    }
    else if(rgb_html_reg.test(color)) {
        return ensureColor(color.match(/[0-9a-f]{2}/ig).map((x)=>parseInt(x, 16))).concat(255);
    }
    else if(rgba_html_reg.test(color)) {
        return ensureColor(color.match(/[0-9a-f]{2}/ig).map((x)=>parseInt(x, 16)));
    }
	
    return [0,0,0,255];
}

function convertToColor(num, opacity) {
    num = ensureColor(num);
    if(!opacity) num.pop();
    
    hexnum = num.map((x)=>{
        let v=x.toString(16);
        if(v.length == 1) v = '0' + v;
        return v;
    });

    return '#' + hexnum.join('');
}


function countDigits(number) {
	return (int(number) + "").length;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcRectArea(arr) {
    return arr[0]*arr[1];
}


// rectangle - rectangle
function checkCollisionRR(object1, object2) {
    var r1 = {
        x: object1.position.x, 
        y: object1.position.y, 
        w: object1.width, 
        h: object1.height},

        r2 = {
        x: object2.position.x, 
        y: object2.position.y, 
        w: object2.width, 
        h: object2.height};

    return (((r2.y < r1.y && r2.y+r2.h >= r1.y) || (r2.y >= r1.y && r2.y <= r1.y+r1.h))
    &&      ((r2.x < r1.x && r2.x+r2.w >= r1.x) || (r2.x >= r1.x && r2.x <= r1.x+r1.w) || (r2.x+r2.w >= r1.x && r2.x+r2.w <= r1.x+r1.w)));

}

// point - point
function checkCollisionPP(object1, object2) {
    return (object1.position.x === object2.position.x &&
            object1.position.y === object2.position.y);
}

// rectangle - point
function checkCollisionRP(object1, object2) {
    return (object2.position.x >= object1.position.x && 
            object2.position.x <= object1.position.x + object1.width && 
            object2.position.y >= object1.position.y && 
            object2.position.y <= object1.position.y + object1.height);
}

function checkCollision(object1, object2) {
    // rectangle - rectangle
    if(object1.shape === 'rectangle' && object1.shape == object2.shape) 
        return checkCollisionRR(object1, object2);

    // point - point
    if(object1.shape === 'point' && object1.shape == object2.shape) 
        return checkCollisionPP(object1, object2);

    // rectangle - point
    if(object1.shape === 'rectangle' && object2.shape == "point") 
        return checkCollisionRP(object1, object2);
    else if(object1.shape === 'point' && object2.shape == "rectangle") 
        return checkCollisionRP(object2, object1);

    return false;
};


Array.prototype.findNearItems = function(item, n) {
    let size = this.length;
    let items = [];
    let last_n = n;
    items.push([this[n], n]);
    for(let i=n-1; i>=0; --i) {
        if(this[i].z !== item.z) break;

        items.push([this[i], i]);
    }

    for(let i=n+1; i<size; ++i) {
        if(this[i].z !== item.z) break;

        items.push([this[i], i]);
        last_n = i;
    }

    return [items, last_n];
};

Array.prototype.pushLog = function(item) {
    if(typeof item != 'object') 
        return false;

    let size = this.length;
    if(size == 0) {
        this.push(item);
        return true;
    }

    let i = Math.floor(size/2);
    let size_i = size;
    let items = [];
    let last_n;

    while(true) {
        size_i = Math.floor(size_i / 2);

        if(this[i].z > item.z) {
            i -= size_i;
            if(size_i === 0) {
                // prepend
                this.splice(i, 0, item);
                return true;
            }
        }
        else if(this[i].z < item.z) {
            i += size_i;
            if(size_i === 0) {
                //append
                this.splice(i+1, 0, item);
                return true;
            }
        }
        else {
            [items, last_n] = this.findNearItems(item, i);
            break;
        }
        
        // out of bound?
        if(i < 0) {
            // at begin
            this.splice(0, 0, item);
            return true;
        }
        else if(i >= size) {
            // at end
            this.push(item);
            return true;
        }
    }

    if(items.length > 0) {
        for(let xitem of items) {
            if(xitem[0] === item) {
                return false;
            }
        }

        this.splice(last_n+1, 0, item);
    }

    return true;
};


Array.prototype.indexOfLog = function(item) {
    if(typeof item !== 'object') 
        return -1;

    let size = this.length;
    if(size === 0)
        return -1;

    let i = Math.floor(size/2);
    let size_i = size;
    let items = [];
    let last_n;

    while(true) {
        size_i = Math.floor(size_i / 2);

        if(this[i].z > item.z) {
            i -= size_i;
            if(size_i === 0)
                return -1;
        }
        else if(this[i].z < item.z) {
            i += size_i;
            if(size_i === 0)
                return -1;
        }
        else {
            [items, last_n] = this.findNearItems(item, i);
            break;
        }
        
        // out of bound?
        if(i < 0)
            return -1;
        else if(i >= size)
            return -1;
    }

    if(items.length > 0) {
        for(let xitem of items) {
            if(xitem[0] === item) {
                return xitem[1];
            }
        }
    }

    return -1;
};

Array.prototype.removeLog = function(item) {
    if(typeof item !== 'object') 
        return false;

    let n_pos = this.indexOfLog(item);
    if(n_pos === -1)
        return false;

    this.splice(n_pos, 1);

    return true;
};