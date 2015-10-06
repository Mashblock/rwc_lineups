let d3 = require('d3'),
    bind = require('lodash/function/bind'),
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
    this.data = d3.nest()
      .key( (d)=> d.nation )
      .sortKeys(d3.ascending)
      .entries(data);
    this.emit('sync');
  }

}

module.exports = LineupData;
