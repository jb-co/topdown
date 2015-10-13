var GAME = GAME || {};


GAME.Component = (function () {

    'use strict';
 
    var createEntity = function (properties, components) {
        
        var entity = {},
            prop;
    
        components.forEach(function (component) {
           
            for (prop in component) {
                if (entity.hasOwnProperty(prop)) {
                    throw "Entity property conflict! " + prop;
                }
                entity[prop] = component[prop];
            }
        });
        
        for (var prop in properties) {
            entity[prop] = properties[prop];   
        }

        return entity;
        
    }
    
    
    //Entities 
    var entity = {
        width : 16,
        height : 16,
        frames : 2,
        x : 0,
        y: 0,
        currentFrame : 0,
        dir : 0
        
    };
    
    //sooooo  entity > mob > npc/player    ;bara npc har offscreen metod
    
    var mob = {
        moveCounter : 0,
        hasFired : false,
        isCollision : function (x, y, mx, my) {

            var mPos = GAME.Manager.getEntityMapPos(this);
            
            for(var i = 0; i < GAME.Manager.getEntities().length; i++){
                
                var entity = GAME.Manager.getEntities()[i],
                    entityPos = GAME.Manager.getEntityMapPos(entity);
                    
                if(entity === this) continue;
                
                if((mPos.x + mx)<= (entityPos.x + entity.width) && (mPos.x + mx + this.width) >= entityPos.x &&
                   (mPos.y + my) <= (entityPos.y + entity.height) && (mPos.y + my + this.height) >= (entityPos.y)){
                    return true;  
                }

            }

            for(var i = 0; i < 4; i++){
                var currentTile = level1[ ((mPos.x + (i%2)*(GAME.tileSize()-1) + mx)>>4) + 
                                         ((mPos.y + ((i/2)>>0)*(GAME.tileSize()-1) + my) >>4)*32];

                if(currentTile > 0)
                    return true;
            }       
            
            return false;

        },    
    }
                  
    
    
    return {

        entity : entity,
        mob : mob,
        createEntity : createEntity
    }
})();

