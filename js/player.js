var GAME = GAME || {};

GAME.Component.player = function (arg_x, arg_y) {
    'use strict';
    
    //private goes here
    
    return GAME.Component.createEntity({
        x : arg_x,
        y : arg_y,
        cropX : 0,
        cropY : 0,
        isPlayer : true,
        isOffscreen : false,

        move: function (mx, my) {

            if (this.moveCounter % 12 === 0) {
                this.currentFrame = (this.currentFrame + 1) % 2;
            }
            this.moveCounter += 1;

            //korta ner namnen for faen.
            if (!this.isCollision(this.x, this.y, mx, my)) {

                var scrollX = GAME.Manager.scrollX,
                    scrollY = GAME.Manager.scrollY,
                    screenSize = GAME.screenSize;
                
                if (mx > 0) {
                    if (scrollX < GAME.mapSize.x * GAME.tileSize() - screenSize.width && this.x >= screenSize.width / 2) {
                        GAME.Manager.scrollX += mx;
                    } else {
                        this.x += mx;
                    }
                    this.dir = 3;
                }

                if (mx < 0) {

                    if (scrollX > 0 && this.x <= screenSize.width / 2) {
                        GAME.Manager.scrollX += mx;
                    } else {
                        this.x += mx;
                    }
                    
                    this.dir = 1;
                }

                if (my > 0) {

                    if (scrollY < GAME.mapSize.y * GAME.tileSize() - screenSize.height && this.y >= screenSize.height / 2) {
                        GAME.Manager.scrollY += my;
                    } else {
                        this.y += my;
                    }

                    this.dir = 0;

                }


                if (my < 0) {

                    if (scrollY > 0 && this.y <= screenSize.height / 2) {
                        GAME.Manager.scrollY += my;
                    } else {
                        this.y += my;
                    }


                    this.dir = 2;

                }

            }


        },
        
        update : function () {
            var mx = 0,
                my = 0;

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


            //ska inte se ut sa har..
            if (mx !== 0) {
                this.move(mx, 0);
            }
            if (my !== 0) {
                this.move(0, my);
            }
            
        }
    }, [GAME.Component.entity, GAME.Component.mob, GAME.Component.player]);
        

  
};