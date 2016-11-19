module.exports = {
    init(room, spawn) {
        room.memory.posLastExtension = {x: spawn.pos.x, y: spawn.pos.y}
    },
    
    run(room, spawn) {
        var lvl = room.controller.level;
        
        /** Extension verification **/
        var extensionsNb = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {structure.type == STRUCTURE_EXTENSION}
        });
        var maxExtensions = CONTROLLER_STRUCTURES['extension'][lvl];
        if(extensionsNb < maxExtensions && room.find(FIND_MY_CONSTRUCTION_SITES, {filter: (constructionSite) => {return constructionSite.structureType != STRUCTURE_ROAD}}).length == 0) {
            this.getNextPlace(room, spawn);
            while(room.createConstructionSite(room.memory.posLastExtension.x, room.memory.posLastExtension.y, STRUCTURE_EXTENSION) == ERR_INVALID_TARGET) {
                this.getNextPlace(room, spawn);
            }
            console.log('start building an extension at (' + room.memory.posLastExtension.x + ', ' + room.memory.posLastExtension.y + ')');
        }
    },
    
    getNextPlace(room, spawn) {
        var x = room.memory.posLastExtension.x - spawn.pos.x;
        var y = room.memory.posLastExtension.y - spawn.pos.y;
        if((x == -y && x >= 0) || (x == y && x < 0) || Math.abs(x) < -y) {
            x = x + 2;
        }
        else if(x > Math.abs(y)) {
            y = y + 2;
        }
        else if((x == y && x > 0) || (Math.abs(x) < Math.abs(y) && y >=0)) {
            x = x - 2;
        }
        else {
            y = y - 2;
        }
        
        room.memory.posLastExtension.x = x + spawn.pos.x;
        room.memory.posLastExtension.y = y + spawn.pos.y;
    }
};