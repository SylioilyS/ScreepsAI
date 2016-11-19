var init = require('init');
var managerRoom = require('managerRoom');
var managerCreeps = require('managerCreeps');

module.exports.loop = function () {
    var spawn1 = Game.spawns['Spawn1'];
    var room = spawn1.room;
    
    /** Initialisation **/
    if(!room.memory.isInitialised) {
        init.run(room, spawn1);
        console.log('AI initialised');
    }
    
    /** Manage the creeps **/
    managerCreeps.run(room, spawn1);
    
    /** Manage the room **/
    managerRoom.run(room, spawn1);
    
}
