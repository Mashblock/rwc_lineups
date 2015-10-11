let d3 = require("d3");

class AgeRenderer {
  constructor(graph){
    this.graph = graph;
    this.x_scale = d3.scale.linear().range([this.graph.width - 160, 0]);
  }

  drawPlayers(selection) {
    this.x_scale.domain(this.graph.source.age_range());

    selection.transition()
      .duration(500)
      .attr('r', 5)
      .attr("cx", (d)=> this.x_scale(new Date(d.date_of_birth)) );    
  }
}

module.exports = AgeRenderer;
