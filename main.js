var managerRoom = require('managerRoom');
var managerCreeps = require('managerCreeps');

module.exports.loop = function () {
    var spawn1 = Game.spawns['Spawn1'];
    var room = spawn1.room;
    
    /** Initialisation **/
    if(!room.memory.isInitialised) {
        room.memory.isInitialised = true;
        room.memory.posLastExtension = {x: spawn1.pos.x, y: spawn1.pos.y};
        console.log('AI initialised');
    }
    
    /** Manage the room **/
    managerRoom.run(room, spawn1);
    
    /** Manage the creeps **/
    managerCreeps.run(room, spawn1);
    
}
