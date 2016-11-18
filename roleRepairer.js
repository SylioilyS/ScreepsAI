var roleUpgrader = require('roleUpgrader');

var roleRepairer = {
    run (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        
        targets.sort((a, b) => a.hits - b.hits);
        
        if(targets.length > 0) {
            if(creep.memory.isRepairing && creep.carry.energy == 0) {
                creep.memory.isRepairing = false;
                creep.say('harvesting');
            }
            if(!creep.memory.isRepairing && creep.carry.energy == creep.carryCapacity) {
                creep.memory.isRepairing = true;
                creep.say('repairing');
            }
            
            if(creep.memory.isRepairing) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }
        else {
            roleUpgrader.run(creep);
        }
    }
}

module.exports = roleRepairer;
