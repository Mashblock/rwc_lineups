let d3 = require("d3"),
    groupBy = require('lodash/collection/groupBy'),
    sortBy = require('lodash/collection/sortBy');

class ClubNationRenderer {
  constructor(graph){
    this.graph = graph;
  }

  drawPlayers(selection) {
    this.graph.top_axis.style("visibility", "hidden");
    var sorted_data = this.sortedData();
    console.log(sorted_data)
    selection.attr('data-nation', (d)=> d.club_nation || "zzz" )
      .transition()
      .duration(500)
      .attr('r', 8)
      .attr("cx", (d)=> (sorted_data[d.nation].indexOf(d)*18) );
  }

  sortedData(){
    var data = sortBy(this.graph.source.raw_data, 'club_nation');
    return groupBy(data, 'nation');
  }
}

module.exports = ClubNationRenderer;
