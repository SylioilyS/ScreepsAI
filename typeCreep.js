module.exports = {
    updateTypes(room) {
        var maxE = room.energyCapacityAvailable;
        
        /** WorkerType **/
        var slots = maxE / 50
        var creepLvlInc = slots % 4;
        var creepLvlComp = (slots - creepLvlInc) / 4;
        
        room.memory.workerType = [];
        for(var i = 0; i < creepLvlComp; i++) {
            room.memory.workerType.push(WORK, MOVE, CARRY);
        }
        switch(creepLvlInc) {
            case 1:
                room.memory.workerType.push(MOVE);
                break;
            case 2:
                room.memory.workerType.push(WORK);
                break;
            case 3:
                room.memory.workerType.push(WORK, MOVE);
                break;
            default:
                /* Do nothing */
                break;
        }
        room.memory.workerType.sort();
        console.log('Types updated');
    }
};