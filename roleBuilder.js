var roleUpgrader = require('roleUpgrader');

var roleBuilder = {
    run (creep) {
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        
        if(target) {
            if(creep.memory.isBuilding && creep.carry.energy == 0) {
                creep.memory.isBuilding = false;
                creep.say('harvesting');
            }
            if(!creep.memory.isBuilding && creep.carry.energy == creep.carryCapacity) {
                creep.memory.isBuilding = true;
                creep.say('building');
            }
            
            if(creep.memory.isBuilding) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                var source = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
        else {
            roleUpgrader.run(creep);
        }
    }
}

module.exports = roleBuilder;
