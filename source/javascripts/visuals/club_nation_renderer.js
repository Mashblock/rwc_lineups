let d3 = require("d3"),
    kebabCase = require('lodash/string/kebabCase');

class ClubNationRenderer {
  constructor(graph){
    this.graph = graph;
  }

  drawPlayers(selection) {
    this.graph.top_axis.style("visibility", "hidden");
    selection.sort( (d)=> d.club_nation )
    selection.attr('data-nation', (d)=> d.club_nation || "Unattached" )
      .transition()
      .duration(500)
      .attr('r', 5)
      .attr("cx", (d, i)=> (i*12) );
  }
}

module.exports = ClubNationRenderer;
