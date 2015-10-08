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
    var entity ={
        width : 16,
        height : 16,
        frames : 2,
        x : 0,
        y: 0,
        currentFrame : 0,
        dir : 0,
        
    };
    
    //sooooo  entity > mob > npc/player    ;bara npc har offscreen metod
    
    var mob = {
        moveCounter : 0,
        isOffscreen : true,
        
        isCollision : function (x, y, mx, my) {

            var xOffset = 0;
            var yOffset = 0;
            
            if(this.isPlayer){
                xOffset = GAME.Manager.scrollX;
                yOffset = GAME.Manager.scrollY;
            }

            for(var i = 0; i < 4; i++){
                var currentTile = level1[ ((xOffset + x + (i%2)*(GAME.tileSize()-1) + mx)>>4) + 
                                         ((yOffset + y + ((i/2)>>0)*(GAME.tileSize()-1) + my) >>4)*32];

                if(currentTile > 0)
                    return true;

            }       

            return false;

        },
        
        isOnscreen : function () {
            var scrollX = GAME.Manager.scrollX,
                scrollY = GAME.Manager.scrollY;
            
            return (this.x + this.width*2 > scrollX && this.x - this.width*2 < scrollX + GAME.screenSize.width && this.y + this.height*2 > scrollY && this.y - this.height*2 < scrollY + GAME.screenSize.height);
        }
          
    }
    
    var blob = function (arg_x, arg_y) {
        
        var turnCounter = 0,
            turnTime = 8;
        
        return createEntity({
            x:      arg_x,
            y:      arg_y,
            cropX : 0,
            cropY:  0,
            move : function () {
                
                var my = 0,
                    mx = 0,
                    oldDir;
                
                
                if  ((turnCounter += 1) > turnTime) {
                    oldDir = this.dir;
                    this.dir = Math.floor(Math.random() * 30);
                    
                    turnCounter = 0;
                }
                
                
                if(this.dir < 4){
                    if (this.moveCounter % 12 === 0) {
                        this.currentFrame = (this.currentFrame + 1) % 2;
                    }
                    this.moveCounter += 1;   
                }
             
                
                switch (this.dir){
                    case 0: 
                        my = 1;
                        break;
                    case 1: 
                        mx = -1;
                        break;
                    case 2:
                        my = -1;
                        break;
                    case 3:
                        mx = 1;
                        break;
                    default:
                        this.dir = oldDir;
                        break;
                }
                
               // if(turnCounter % 2 === 0) return;
                if (!this.isCollision(this.x, this.y, mx, my)) {
                    this.x += mx/1.4;
                    this.y += my/1.4;
                }
                else {
                    //this.dir = (this.dir += 2) % 4;   //turn opposite direction 
                    turnCounter = turnTime;
                }
                
            },
            update : function(){
                
                if (this.isOnscreen()) { 
                    this.isOffscreen = false;
                    this.move();
                    
                }
                else {
                    this.isOffscreen = true;
                }
            }
        
        }, [GAME.Component.entity, GAME.Component.mob]);
    };
                  
    
    
    return {

        entity : entity,
        mob : mob,
        blob : blob,
        createEntity : createEntity
    }
})();

