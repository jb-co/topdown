var GAME = GAME || {};

GAME.Input = (function () {

    'use strict';
    
    var keyState = {},
        keyLeft = function(){
            return keyState[37];
        },
        keyRight = function(){
            return keyState[39]; 
        },
        keyUp = function(){
            return keyState[38];
        },
        keyDown = function(){
            return keyState[40];
        },
        keySpace = function(){
          return keyState[32];  
        };
    
    document.addEventListener("keydown", function(e){
        keyState[e.keyCode || e.which] = true;
    }, true);

    document.addEventListener("keyup", function(e){
        keyState[e.keyCode || e.which] = false;
    }, true);
    
    
    
    
    return {
        keyLeft : keyLeft,
        keyRight: keyRight,
        keyUp : keyUp,
        keyDown : keyDown,
        keySpace : keySpace
    };
})(window);