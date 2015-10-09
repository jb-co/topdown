var GAME = GAME || {};

GAME.Component.blob = function (arg_x, arg_y) {

    'use strict';
    
    var turnCounter = Math.random()*12,
        turnTime = 32,
        isStuck = false,
        speed = 0.6,
        mx = 0,
        my = 0;

    return GAME.Component.createEntity({
        x:      arg_x,
        y:      arg_y,
        cropX : 0,
        cropY:  17*2,
        move : function () {


            var playerX = GAME.Manager.getEntities()[0].x + GAME.Manager.getScrollX();
            var playerY = GAME.Manager.getEntities()[0].y + GAME.Manager.getScrollY();// this should be passed as reference probably
            
            if (this.moveCounter % 12 === 0) {
                this.currentFrame = (this.currentFrame + 1) % 2;
            }
            this.moveCounter += 1; 
            
            if((Math.abs(this.x - (playerX + 8)) < 48) && (Math.abs(this.y - playerY) < 48) && !isStuck){
                
                var deltaX = playerX - this.x;
                var deltaY = playerY - this.y;
                
                var len = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
               
                deltaX = deltaX / len;
                deltaY = deltaY / len;
                
                turnCounter = 0;
                speed = 1;
                 
                mx = deltaX;
               
                my = deltaY;
                
             
            }
            else {
             
                speed = 0.4;
                        
                
                if  ((turnCounter += 1) > turnTime) {
                   
                    
                        mx = ((Math.random() * 2)-1);
                        my = (Math.random() * 2)-1;

                    turnCounter = 0;
                }
                
            }
            
           if(my >= mx) this.dir = Math.round(1 - my);
            else this.dir = Math.round(2 + mx);

            
            if (!this.isCollision(this.x, this.y, mx, my)) {
                this.x += mx * speed;
                this.y += my * speed;
                isStuck = false;
            }
            else {
                isStuck = true;
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

GAME.Component.kirby = function (arg_x, arg_y) {

    var turnCounter = 0,
        turnTime = 8;

    return GAME.Component.createEntity({
        x:      arg_x,
        y:      arg_y,
        cropX : 0,
        cropY:  17*1,
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