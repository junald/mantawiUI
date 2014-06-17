

define(function(require, exports, module) {
    
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var RenderNode = require('famous/core/RenderNode');
    var Modifier = require('famous/core/Modifier');
    var Scrollview = require('famous/views/Scrollview');
    var GridLayout = require('famous/views/GridLayout');

    function ContentView() {
        View.apply(this, arguments);
        _createContent.call(this);
    }

    ContentView.prototype = Object.create(View.prototype);
    ContentView.prototype.constructor = ContentView;

    ContentView.DEFAULT_OPTIONS = {
    };


    function _createContent() {

        var scrollViews = [];

        var scrollview = new Scrollview();
        scrollview.sequenceFrom(scrollViews);

        var gridCells = [];

        var grid = new GridLayout();
        grid.sequenceFrom(gridCells);

        grid.mod = new Modifier();

        var cellCount = 24;
        var cellMinWidth = 200.0;

        grid.mod.sizeFrom(function() {

           // var size = context.getSize();
         //  console.log(this.getSize());
            var size =[window.innerWidth-260,window.innerHeight];

            var cellsX = Math.floor(size[0] / cellMinWidth);
            var cellsY = Math.ceil(cellCount * 1.0 / cellsX);
            var cellHeight = 300;// size[0] * 1.0 / cellsX;

            grid.setOptions({dimensions: [cellsX, cellsY]});


            var extra = size[0] - (cellsX * cellMinWidth);
            var extraWidth = 0;
            if (extra > 0) {
                extraWidth = Math.floor(extra / cellsX);
            }
            for (var i = 0; i < 24; i++) {
                var s = gridCells[i];
                s.setSize([cellMinWidth + extraWidth - 40, 280]);
            }

            return [undefined, cellsY * cellHeight];
        });

        grid.node = new RenderNode();
        grid.node.add(grid.mod).add(grid);


        for (var i = 0; i < cellCount; i++) {
            var surface = new Surface({
                size: [cellMinWidth, 280],
                properties: {
                    //backgroundColor: 'hsl(' + (i * 360 / 12) + ',75%,50%)',                
                    borderRadius: '5px',
                    borderStyle: 'solid',
                    borderWidth: '1px' 
                   
                }
            });

            gridCells.push(surface);
            surface.pipe(scrollview);

        }
        
       
        scrollViews.push(grid.node);
        this.add(scrollview);
    }

    module.exports = ContentView;
});
