var GAME = GAME || {};

GAME = (function(){
    
    'use strict';
    
    var loadData = function(path){
        
     
    }
    
    var tileSize = function(){
        return 16;   
    }
    
    var screenSize = {width: 256, height: 224};
    
    var mapSize = {x: 32, y: 16};
    
    
    return {
        
        tileSize : tileSize,
        loadData : loadData,
        screenSize : screenSize,
        mapSize : mapSize
    }
})();