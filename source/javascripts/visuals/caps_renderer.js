let d3 = require("d3");

class CapsRenderer {
  constructor(graph){
    this.graph = graph;
    this.x_scale = d3.scale.linear().range([0, this.graph.width - 160]);
    this.x_axis = d3.svg.axis().scale(this.x_scale).orient("top");
  }

  drawPlayers(selection) {
    this.x_scale.domain(this.graph.source.caps_range()).nice(10);
    this.graph.top_axis.style("visibility", "visible")
      .call(this.x_axis);

    selection.attr('data-nation', null)
      .transition().duration(500)
      .attr('r', 5)
      .attr("cx", (d)=> this.x_scale(parseInt(d.caps, 10)) )
      .attr("cy", 0)
  }
}

module.exports = CapsRenderer;
