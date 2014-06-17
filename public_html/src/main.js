define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var AppView = require('AppView');
   
    // create the main context
    var mainContext = Engine.createContext();
    
    // your app here
    var appView = new AppView();      
    
   

    mainContext.add(appView);
   

});
