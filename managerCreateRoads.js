/** Automatic road creation **/
/*
  run (spawn): creates roads between:
    - the given spawn
    - the sources and the controller
  createARoad(target1, target2): creates a road between the two given targets
*/

var createRoads = {
    run (spawn) {
        this.createARoad(spawn, spawn.room.controller);
        var sources = spawn.room.find(FIND_SOURCES);
        for(var sourceNum in sources) {
            this.createARoad(spawn, sources[sourceNum]);
        }
    },
    
    createARoad (target1, target2) {
        var positions = target1.pos.findPathTo(target2);
        for(var positionNum in positions) {
            var position = positions[positionNum];
            target1.room.createConstructionSite(position.x, position.y, STRUCTURE_ROAD)
        }
    }
};

module.exports = createRoads;
