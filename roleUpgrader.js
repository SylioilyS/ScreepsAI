var roleUpgrader = {
    run (creep) {
        if(creep.memory.isUpgrading && creep.carry.energy == 0) {
            creep.memory.isUpgrading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.isUpgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.isUpgrading = true;
            creep.say('upgrading');
        }
        
        if(creep.memory.isUpgrading) {
            var target = creep.room.controller;
            if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
    }
};

module.exports = roleUpgrader;
