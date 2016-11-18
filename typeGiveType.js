var typeGiveType = {
    run (room, type) {
        switch(room.energyCapacityAvailable) {
            default:
                console.log('Please update types');
            case 550:
                switch(type) {
                    case 'workerType':
                        return [WORK, WORK,WORK, MOVE, MOVE, MOVE, CARRY, CARRY];
                        break;
                    default:
                        console.log('Unknown type ' + type);
                        break;
                }
                break;
            case 300:
                switch(type) {
                    case 'workerType':
                        return [WORK, WORK, MOVE, CARRY];
                        break;
                    default:
                        console.log('Unknown type ' + type);
                        break;
                }
                break;
        }
    }
};

module.exports = typeGiveType;
