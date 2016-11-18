var roleUpgrader = require ('roleUpgrader');

var roleHarvester = {
    run (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
            }
        })
        
        if(targets.length > 0) {
            if(creep.carry.energy < creep.carryCapacity) {
                if(creep.memory.justTransfered) {
                    creep.say(creep.room.energyAvailable);
                    creep.memory.justTransfered = false;
                }
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            else {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                else {
                    creep.memory.justTransfered = true;
                }
            }
        }
        else {
            roleUpgrader.run(creep);
        }
    }
};

module.exports = roleHarvester;
