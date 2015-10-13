var GAME = GAME || {};

GAME.Component.player = function (arg_x, arg_y) {
    'use strict';
    
    //private goes here
    var speed = 1.2;
    var len = Math.sqrt(2);
    var cooldownCounter = 0;
    
    return GAME.Component.createEntity({
        x : arg_x,
        y : arg_y,
        cropX : 0,
        cropY : 0,
        isPlayer : true,
        isOffscreen : false,
        isCooledDown : true,
        cooldown : 10,

        move: function (mx, my) {

            if (this.moveCounter % 12 === 0) {
                this.currentFrame = (this.currentFrame + 1) % 2;
            }
            this.moveCounter += 1;
            

            //korta ner namnen for faen.
            if (!this.isCollision(this.x, this.y, mx * speed, my * speed)) {

                var scrollX = GAME.Manager.scrollX,
                    scrollY = GAME.Manager.scrollY,
                    screenSize = GAME.screenSize;
                
                
                if (my > 0) {

                    if (scrollY < GAME.mapSize.y * GAME.tileSize() - screenSize.height && this.y >= screenSize.height / 2) {
                        GAME.Manager.scrollY += my * speed;
                    } else {
                        this.y += my * speed;
                    }

                    this.dir = 0;

                }


                if (my < 0) {

                    if (scrollY > 0 && this.y <= screenSize.height / 2) {
                        GAME.Manager.scrollY += my * speed;
                    } else {
                        this.y += my * speed;
                    }


                    this.dir = 2;

                }
                
                if (mx > 0) {
                    if (scrollX < GAME.mapSize.x * GAME.tileSize() - screenSize.width && this.x >= screenSize.width / 2) {
                        GAME.Manager.scrollX += mx * speed;
                    } else { 
                        this.x += mx * speed;
                    }
                    this.dir = 3;
                }

                if (mx < 0) {

                    if (scrollX > 0 && this.x <= screenSize.width / 2) {
                        GAME.Manager.scrollX += mx * speed;
                    } else {
                        this.x += mx * speed;
                    }

                    this.dir = 1;
                }

            }


        },
        
        update : function () {
            var mx = 0,
                my = 0;
            
            if(this.hasFired){
                cooldownCounter += 1;   
                this.isCooledDown = false;
            }
            
            if(cooldownCounter >= this.cooldown){
                cooldownCounter = 0;
                this.isCooledDown = true;
                this.hasFired = false;
            }
            
            if(GAME.Input.keySpace()){
                this.hasFired = true; 
            }
            

            if (GAME.Input.keyRight()) {
                mx = 1;
            } else if (GAME.Input.keyLeft()) {
                mx = -1;
            }

            if (GAME.Input.keyDown()) {
                my = 1;
            } else if (GAME.Input.keyUp()) {
                my = -1;
            }
            
            if(mx != 0 && my != 0){
                

                mx = mx / len;
                my = my / len;
            }

          
            //ska inte se ut sa har..
            
            if (my !== 0) {
                this.move(0, my);
            }
            if (mx !== 0) {
                this.move(mx, 0);
            }
        }
    }, [GAME.Component.entity, GAME.Component.mob]);
        

  
};