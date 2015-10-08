var GAME = GAME || {};

GAME.Renderer = (function () {
    'use strict';
    
    var canvas = document.getElementById("gameCanvas"),
        context = canvas.getContext("2d"),
        fpsNode = document.getElementById("fps"),
        
        drawMap = function () {

            context.fillStyle = "#999";
            context.fillRect(0, 0, 320, 200);

            var scrollX = GAME.Manager.scrollX,
                scrollY = GAME.Manager.scrollY,
                left = scrollX >> 4,
                top = scrollY >> 4,
                x,
                y;



            for (y = top; y < top + 15; y += 1) {

                for (x = left; x < left + 17; x += 1) {

                    //if(x < 0 || y < 0) continue;

                    switch (level1[x + y * 32]) {

                        case 0:
                            context.fillStyle = "#009900";
                            break;
                        case 1:
                            context.fillStyle = "#CCC";
                            break;
                        case 2:
                            context.fillStyle = "#888";
                            break;
                        case 3:
                            context.fillStyle = "#444";
                            break;


                    }


                    context.fillRect(x * GAME.tileSize() - scrollX, y * GAME.tileSize() - scrollY, GAME.tileSize(), GAME.tileSize());

                }

            }

        },
        
        drawEntities = function () {

            var entities = GAME.Manager.getEntities(),
                i,
                e,
                offsetX,
                offsetY;
            
            for (i = 0; i < entities.length; i += 1) {

                e = entities[i];
                
                if(e.isOffscreen) {
                    continue;
                }
               
                
                offsetX = GAME.Manager.scrollX;
                offsetY = GAME.Manager.scrollY;

                if (e.hasOwnProperty('isPlayer')) {
                    offsetX = offsetY = 0;
                }

                context.drawImage(GAME.Manager.getImage(), (e.currentFrame * (e.width + 1)) + e.cropX, (e.width + 1) * e.dir + e.cropY, e.width, e.height, e.x - offsetX, e.y - offsetY, e.width, e.height);

            }

        },

        
        render = function () {
            drawMap();
            drawEntities();
        },
    
        updateFPS = function (value) {
            fpsNode.innerHTML = value + " fps";
        };

        
        
    
  
    canvas.width = GAME.screenSize.width;
    canvas.height = GAME.screenSize.height;
    
    
    return { render : render,
             updateFPS: updateFPS};
    
}());