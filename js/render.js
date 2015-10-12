var GAME = GAME || {};

GAME.Renderer = (function () {
    'use strict';
    
    var canvas = document.getElementById('gameCanvas'),
        context = canvas.getContext('2d'),
        fpsNode = document.getElementById('fps'),
        
        bufferCanvas = document.createElement('canvas'),
        bufferContext = bufferCanvas.getContext('2d'),
  
        
        drawMap = function () {

            var scrollX = GAME.Manager.scrollX >> 0, 
                scrollY = GAME.Manager.scrollY >> 0,
                left = scrollX >> 4,
                top = scrollY >> 4,
                x,
                y;
            

            var cropX = 0,
                cropY = 17*8 + 1;
            
            
            for (y = top; y < top + 15; y += 1) {

                for (x = left; x < left + 17; x += 1) {

                    switch (level1[x + y * 32]) {

                        case 0:
                            cropX = 1;
                           
                            break;
                        case 1:
                            cropX = 17*1 + 1;
                         
                            break;
                        case 2:
                            cropX = 17*2 + 1;
                           
                            break;
                        case 3:
                            cropX = 17*1 + 1;
                            break;


                    }

       
                    
                    bufferContext.drawImage(GAME.Manager.getImage(), cropX, cropY, 16, 16, (x * GAME.tileSize() - scrollX),
                                            (y * GAME.tileSize() - scrollY), GAME.tileSize(), GAME.tileSize());

                }

            }
            

            context.drawImage(bufferCanvas, 0,0);
         
           

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
               
                
                offsetX = GAME.Manager.scrollX >> 0;
                offsetY = GAME.Manager.scrollY >> 0;

                if (e.hasOwnProperty('isPlayer')) {
                    offsetX = offsetY = 0;
                }

                context.drawImage(GAME.Manager.getImage(), 1 + e.dir*34 + e.currentFrame*17, 1 + e.cropY, e.width, e.height, 
                                  (e.x - offsetX) >> 0, (e.y - offsetY) >> 0,  e.width, e.height);

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
    canvas.style.width  = '512px';
    canvas.style.height = '448px';
   
    
    context.imageSmoothingEnabled = false;
    window.devicePixelRatio = 1;
    
    bufferCanvas.width = canvas.width;
    bufferCanvas.height = canvas.height;
    
    
    context.lineWidth = 1;
    context.strokeWidth = 1;
    bufferContext.lineWidth = 1;
    bufferContext.strokeWidth = 1;
    bufferContext.imageSmoothingEnabled = false;
    

    return { render : render,
             updateFPS: updateFPS};
    
}());