let d3 = require('d3'),
    bind = require('lodash/function/bind');


class LineupVisual {
  constructor(element, source){
    this.element = d3.select(element);
    this.source = source;
    this.source.on('sync', bind(this.redraw, this));

    this.age_scale = d3.scale.linear().range([400, 0]);

    this.svg = this.element.append('svg').attr("width", this.element.style('width'));
  }

  redraw(){
    this.svg.attr('height', this.source.data.length * 30);
    this.age_scale.domain(this.source.age_range());

    this.svg.selectAll('g.row')
      .data(this.source.data, (d)=> d.key )
      .call(bind(this.drawRows, this));
  }

  drawRows(selection) {
    var new_rows = selection.enter().append('g').attr('class', 'row');
    new_rows.append("text").attr("class", "nation");
    new_rows.append("g").attr("class", "paper");

    selection.exit().remove();

    selection.attr('transform', (d, i)=> `translate(100, ${(i*30)+15})`)

    selection.selectAll("text.nation").text( (d)=> d.key );
    selection.selectAll("g.paper").attr("transform", "translate(115, -5)")
      .call(bind(this.drawPlayers, this));

  }

  drawPlayers(selection) {
    var players = selection.selectAll("circle.player")
      .data( (d)=> d.values , (d)=> d.name );

    players.enter().append("circle").attr('class', 'player')
      .append("title");

    players.exit().remove();

    players.attr('r', 5)
      .attr("cx", (d)=> this.age_scale(new Date(d.date_of_birth)) )
      .attr("cy", 0)
    players.selectAll("title").text( (d)=> d.name )
  }
}

module.exports = LineupVisual;
