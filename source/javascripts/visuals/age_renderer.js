let d3 = require("d3");

class AgeRenderer {
  constructor(graph){
    this.graph = graph;
    this.x_scale = d3.scale.linear().range([this.graph.width - 160, 0]);
  }

  drawPlayers(selection) {
    this.x_scale.domain(this.graph.source.age_range());
    var players = selection.selectAll("circle.player")
      .data( (d)=> d.values , (d)=> d.name );

    players.enter().append("circle").attr('class', 'player')
      .append("title");

    players.exit().remove();

    players.attr('r', 5)
      .attr("cx", (d)=> this.x_scale(new Date(d.date_of_birth)) )
      .attr("cy", 0)
    players.selectAll("title").text( (d)=> d.name )
  }
}

module.exports = AgeRenderer;
