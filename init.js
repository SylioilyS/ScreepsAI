module.exports = {
    run(room, spawn) {
        room.memory.isInitialised = true;
        
        /** managerRoom.init **/
        require('managerRoom').init(room, spawn);
        
        /** managerCreeps.init **/
        require('managerCreeps').init(room);
    }
};