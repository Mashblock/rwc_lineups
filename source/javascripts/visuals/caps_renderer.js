let d3 = require("d3");

class CapsRenderer {
  constructor(graph){
    this.graph = graph;
    this.x_scale = d3.scale.linear().range([0, this.graph.width - 160]);
  }

  drawPlayers(selection) {
    this.x_scale.domain(this.graph.source.caps_range());
    var players = selection.selectAll("circle.player")
      .data( (d)=> d.values , (d)=> d.name );

    players.enter().append("circle").attr('class', 'player')
      .append("title");

    players.exit().remove();

    players.attr('r', 5)
      .attr("cx", (d)=> this.x_scale(parseInt(d.caps, 10)) )
      .attr("cy", 0)
    players.selectAll("title").text( (d)=> d.name )
  }
}

module.exports = CapsRenderer;
