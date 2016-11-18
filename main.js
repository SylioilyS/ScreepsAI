var managerRoom = require('managerRoom');

var roleHarvester = require ('roleHarvester');
var roleUpgrader = require ('roleUpgrader');
var roleBuilder = require ('roleBuilder');
var roleRepairer = require ('roleRepairer');

var typeGiveType = require ('typeGiveType');

module.exports.loop = function () {
    var spawn1 = Game.spawns['Spawn1'];
    var room = spawn1.room;
    
    /** Initialisation **/
    if(!room.memory.isInitialised) {
        room.memory.isInitialised = true;
        room.memory.posLastExtension = {x: spawn1.pos.x, y: spawn1.pos.y};
        console.log('AI initialised');
    }
    
    /** free memory **/
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    /** Manage the room **/
    managerRoom.run(room, spawn1);
    
    /** Max creeps **/
    var maxHarvesters = 3;
    var maxBuilders = 3;
    var maxUpgraders = 10;
    var maxRepairers = 3;
    
    /** creep types **/
    var workerType = typeGiveType.run(room, 'workerType');
    var securityType =  [WORK, WORK, MOVE, CARRY];
    
    /** creep creation **/
    var isCreating = false;
    
    /** Harvester creation **/
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < maxHarvesters && spawn1.canCreateCreep(workerType) == OK && !isCreating) {
        isCreating = true;
        var newName = spawn1.createCreep(workerType, undefined, {role: 'harvester'});
        console.log(newName + ' the harvester is born');
    }
    /** security harvester **/
    else if(harvesters.length == 0 && spawn1.canCreateCreep(securityType) == OK && !isCreating) {
        isCreating = true;
        var newName = spawn1.createCreep(securityType, undefined, {role: 'harvester'});
        console.log(newName + ' the securityHarvester is born');
    }
    
    /** Repairer creation **/
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if(repairers.length < maxRepairers && spawn1.canCreateCreep(workerType) == OK && !isCreating) {
        isCreating = true;
        var newName = spawn1.createCreep(workerType, undefined, {role: 'repairer'});
        console.log(newName + ' the repairer is born');
    }
    
    /** Builder creation **/
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < maxBuilders && spawn1.canCreateCreep(workerType) == OK && !isCreating) {
        isCreating = true;
        var newName = spawn1.createCreep(workerType, undefined, {role: 'builder'});
        console.log(newName + ' the builder is born');
    }
    
    /** Upgrader creation **/
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < maxUpgraders && spawn1.canCreateCreep(workerType) == OK && !isCreating) {
        isCreating = true;
        var newName = spawn1.createCreep(workerType, undefined, {role: 'upgrader'});
        console.log(newName + ' the upgrader is born');
    }
    
    /** creep actions **/
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            default:
                console.log('creep '+name+' does nothing');
                break;
        }
    }
    
}
