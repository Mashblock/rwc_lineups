let d3 = require('d3'),
    bind = require('lodash/function/bind'),
    pluck = require('lodash/collection/pluck'),
    emitter = require('component-emitter');

class LineupData {
  constructor(endpoint){
    emitter(this);
    this.data = [];
    this.endpoint = endpoint;
  }

  fetch(){
    d3.json('data/players.json', bind(this.parse, this))
  }

  parse(e, data){
    this.raw_data = data;
    this.data = d3.nest()
      .key( (d)=> d.nation )
      .sortKeys(d3.ascending)
      .entries(data);
    this.emit('sync');
  }

  age_range(){
    var values = pluck(this.raw_data, 'date_of_birth').map( (d)=> new Date(d) )
    return d3.extent(values);
  }

  caps_range(){
    var values = pluck(this.raw_data, 'caps').map( (d)=> parseInt(d, 10) )
    return d3.extent(values);
  }
}

module.exports = LineupData;
