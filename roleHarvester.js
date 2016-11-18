var roleUpgrader = require ('roleUpgrader');

var roleHarvester = {
    run (creep) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
            }
        })
        
        if(target) {
            if(creep.memory.isTransfering && creep.carry.energy == 0) {
                creep.memory.isTransfering = false;
                creep.say(creep.room.energyAvailable);
            }
            if(!creep.memory.isTransfering && creep.carry.energy == creep.carryCapacity) {
                creep.memory.isTransfering = true;
                creep.say('transfer');
            }
            
            if(!creep.memory.isTransfering) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            roleUpgrader.run(creep);
        }
    }
};

module.exports = roleHarvester;
