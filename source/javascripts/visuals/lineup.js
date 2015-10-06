let d3 = require('d3'),
    bind = require('lodash/function/bind');


class LineupVisual {
  constructor(element, source){
    this.element = d3.select(element);
    this.source = source;
    this.source.on('sync', bind(this.redraw, this))

    this.svg = this.element.append('svg').attr("width", this.element.style('width'));
  }

  redraw(){
    this.svg.attr('height', this.source.data.length * 30)

    this.rows = this.svg.selectAll('g.row')
      .data(this.source.data, (d)=> d.key );

    this.rows.enter().append('g').attr('class', 'row')
      .append("text").attr("class", "nation");

    this.rows.exit().remove();

    this.rows.attr('transform', (d, i)=> `translate(100, ${(i*30)+15})`)
    this.rows.selectAll("text.nation").text( (d)=> d.key );
  }
}

module.exports = LineupVisual;
