

define(function(require, exports, module) {

    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");
    var StateModifier = require('famous/modifiers/StateModifier');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var FlexibleLayout = require('famous/views/FlexibleLayout');
    var ContentView = require('ContentView');
    var Engine = require('famous/core/Engine');

    function AppView() {
        View.apply(this, arguments);
        _createLayout.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };


    function _createLayout() {


        var layout = new HeaderFooterLayout({
            headerSize: 100,
            footerSize: 50
        });

        layout.header.add(new Surface({
            size: [undefined, 100],
            content: "Header",
            classes: ["red-bg"],
            properties: {
                lineHeight: "100px",
                textAlign: "center"
            }
        }));

        this.contentView = new ContentView();
        var contentModifier = new Modifier({
            //origin: [.1,0],
            transform: Transform.translate(10, 10, -1)  // zindex was applied here -1
        });

        //// flex layout
        var initialRatios = [1, true, 3];
        
        var menuSurfaceColor = 'rgba(0, 0, 256, .7)';
        var barSurfaceColor = 'rgba(0, 0, 0, 0)';

        var flex = new FlexibleLayout({
            ratios: initialRatios
        });
        var surfaces = [];
        var menuSurface = new Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: menuSurfaceColor
            }
        })
        surfaces.push(menuSurface);
        
        
        var barSurface = new Surface({
            size: [10, undefined],
            properties: {
                backgroundColor: barSurfaceColor
            }
        })
        surfaces.push(barSurface);

        surfaces.push(this.contentView);
        flex.sequenceFrom(surfaces);
        layout.content.add(contentModifier).add(flex);



        //  layout.content.add(contentModifier).add(this.contentView);

        var finalRatios = [0, true, 3];
        var toggle = false;
        
        menuSurface.on('click', function() {
            var ratios = toggle ? initialRatios : finalRatios;
            flex.setRatios(ratios, {curve: 'easeOut', duration: 500});
            toggle = !toggle;
            barSurface.setProperties( {backgroundColor: toggle ?  menuSurfaceColor: barSurfaceColor });
        });
        
        barSurface.on('click', function() {
            var ratios = toggle ? initialRatios : finalRatios;
            flex.setRatios(ratios, {curve: 'easeOut', duration: 500});
            toggle = !toggle;
             barSurface.setProperties( {backgroundColor: toggle ?  menuSurfaceColor : barSurfaceColor});
        });

        layout.footer.add(new Surface({
            size: [undefined, 50],
            content: "Footer",
            classes: ["red-bg"],
            properties: {
                lineHeight: "50px",
                textAlign: "center"
            }
        }));

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(layoutModifier).add(layout);
    }
    module.exports = AppView;
});
