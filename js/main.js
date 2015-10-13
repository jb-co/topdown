
var GAME = GAME || {};

GAME.Manager = (function () {
    
    'use strict';
 
    var counter = 0,
        before = 0,
        scrollX = 0,
        scrollY = 0,
        image,
        entities = [],
        
        timestamp = function () {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        },
        
        update = function () {
            var i,
                entity;

            for (i = 0; i < entities.length; i += 1) {
                entity = entities[i];
                if (entity.hasOwnProperty('update')) {
                    entity.update();
                }
                
                if(entity.hasFired && entity.isCooledDown){
                  
                    entities.push(GAME.Component.projectile(getEntityMapPos(entity).x, getEntityMapPos(entity).y, entity));
                    
                }
            }
        },
        
        gameLoop = function () {
             
            window.requestAnimationFrame(gameLoop);
            
            var now = timestamp(),
                delta = (now - before) / 1000;
            
            counter += 1;

            if (delta >= 1) {
                GAME.Renderer.updateFPS(counter);
                counter = 0;
                before = now;
            }

            update();

            GAME.Renderer.render();
            
        

        },
        
        init = function () {
            image = new Image();
            image.src = "gfx/spritesheet.png";
        
            image.onload = function () {
            
                entities.push(GAME.Component.player(40, 80));
                entities.push(GAME.Component.blob(100, 120));
                entities.push(GAME.Component.kirby(300, 100));
                entities.push(GAME.Component.blob(200, 80));
           
                gameLoop();
           
            };
        },

        getScrollX = function () {
            return this.scrollX;
        },
    
        getScrollY = function () {
            return this.scrollY;
        },
    
        getImage = function () {
            return image;
        },
    
        getEntities = function () {
            return entities;
        },
     
        getEntityMapPos = function (entity) {
            
            if (entity.isPlayer) {
                return {x : entity.x + GAME.Manager.scrollX,
                        y : entity.y + GAME.Manager.scrollY };
            }
            
            return {x : entity.x,
                    y : entity.y };
        };
    
    return {
        init : init,
        getScrollX : getScrollX,
        getScrollY : getScrollY,
        getImage : getImage,
        getEntities : getEntities,
        getEntityMapPos : getEntityMapPos,
        scrollX : scrollX,
        scrollY : scrollY
    };


}(window));

GAME.Manager.init();