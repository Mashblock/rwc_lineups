let d3 = require('d3'),
    bind = require('lodash/function/bind'),
    AgeRenderer = require('./age_renderer');


class LineupVisual {
  constructor(element, source){
    this.element = d3.select(element);
    this.source = source;
    this.source.on('sync', bind(this.redraw, this));
    this.width = parseInt(this.element.style('width').replace("px", ''), 10)

    this.age_scale = d3.scale.linear().range([this.width - 160, 0]);

    this.svg = this.element.append('svg').attr("width", this.width);

    this.renderer = new AgeRenderer(this);
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
    selection.selectAll("g.paper").attr("transform", "translate(30, -5)");
    this.renderer.drawPlayers(selection.selectAll("g.paper"));

  }
}

module.exports = LineupVisual;
