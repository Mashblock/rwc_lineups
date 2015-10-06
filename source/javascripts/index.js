let LineupVisual = require('./visuals/lineup'),
    LineupData   = require('./data/lineup');


var lineup_data = new LineupData();
var lineup_vis = new LineupVisual(document.querySelector('#graph'), lineup_data);
lineup_data.fetch();
