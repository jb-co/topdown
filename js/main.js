
var GAME = GAME || {};

GAME.Manager = (function () {
    
    'use strict';
 
    var counter = 0,
        now = 0,
        before = 0,
        lastUpdate = 0,
        scrollX = 0,
        scrollY = 0,
        image,
        entities = [],
        
        timestamp = function () {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        },
        
        gameLoop = function () {
             
            window.requestAnimationFrame(gameLoop);
            
            var delta = (now - before) / 1000,
                deltaF = (now - lastUpdate),
                mx = 0,
                my = 0,
                i = 0,
                entity;
            
            now = timestamp();

            counter += 1;

            if (delta >= 1) {
                GAME.Renderer.updateFPS(counter);
                counter = 0;
                before = now;
            }

            for (i = 0; i < entities.length; i += 1) {
                entity = entities[i];
                if (entity.hasOwnProperty('update')) {
                    entity.update();
                }
            }

            lastUpdate = now;


            GAME.Renderer.render();

            if (deltaF < 1000 / 60) {
                setTimeout(function () {}, (1000 / 60 - deltaF));
            }




        },
        
        init = function () {
            image = new Image();
            image.src = "gfx/spritesheet.png";
        
            image.onload = function () {
            
                entities.push(GAME.Component.player(40, 80));
                entities.push(GAME.Component.blob(100, 120));
                entities.push(GAME.Component.blob(300, 100));
                entities.push(GAME.Component.blob(200, 80));
       
                gameLoop();
           
            };
        },

        update = function () {

        },
  
        getScrollX = function () {
            return scrollX;
        },
    
        getScrollY = function () {
            return scrollY;
        },
    
        getImage = function () {
            return image;
        },
    
        getEntities = function () {
            return entities;
        };
    
    return {
        init : init,
        getScrollX : getScrollX,
        getScrollY : getScrollY,
        getImage : getImage,
        getEntities : getEntities,
        scrollX : scrollX,
        scrollY : scrollY
    };


}(window));

GAME.Manager.init();