let LineupVisual = require('./visuals/lineup'),
    LineupData   = require('./data/lineup'),
    TypeSwitch   = require('./components/type_switch');


var lineup_data = new LineupData();
var lineup_vis = new LineupVisual(document.querySelector('#graph'), lineup_data);

var type_switch = new TypeSwitch(document.querySelector(".do-graph-type"), lineup_vis);

lineup_data.fetch();
