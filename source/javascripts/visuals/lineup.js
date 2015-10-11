let d3 = require('d3'),
    bind = require('lodash/function/bind'),
    AgeRenderer = require('./age_renderer'),
    CapsRenderer = require('./caps_renderer'),
    ClubNationRenderer = require('./club_nation_renderer');


class LineupVisual {
  constructor(element, source){
    this.element = d3.select(element);
    this.source = source;
    this.source.on('sync', bind(this.redraw, this));
    this.width = parseInt(this.element.style('width').replace("px", ''), 10)

    this.svg = this.element.append('svg').attr("width", this.width);
    this.list = this.svg.append("g").attr("class", "list")
      .attr("transform", "translate(0, 30)");

    this.top_axis = this.svg.append("g").attr("class", "top-axis")
      .attr("transform", "translate(130, 30)");

    this.renderers = {
      age: new AgeRenderer(this),
      caps: new CapsRenderer(this),
      club_nation: new ClubNationRenderer(this)
    };

    this.setType('club_nation');
  }

  setType(type){
    this.renderer = this.renderers[type];
    this.redraw()
  }

  redraw(){
    if (this.source.data.length == 0) return;
    this.svg.attr('height', (this.source.data.length * 30) + 60 );

    this.list.selectAll('g.row')
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
    selection.selectAll("g.paper").attr("transform", "translate(30, -5)")
      .call(bind(this.drawPlayers, this));
  }

  drawPlayers(selection){
    var players = selection.selectAll("circle.player")
      .data( (d)=> d.values , (d)=> d.name );

    players.enter().append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 0)
      .attr('class', 'player')
      .append("title");

    players.exit().remove();

    players.selectAll("title").text( (d)=> d.name );

    this.renderer.drawPlayers(players);
  }
}

module.exports = LineupVisual;
