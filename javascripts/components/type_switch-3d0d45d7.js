let $ = require('jquery'),
    bind = require('lodash/function/bind');

class TypeSwitch {
  constructor(element, graph){
    this.element = $(element);
    this.graph = graph;
    $("a[data-type]", this.element).on("click", bind(this.onSelect, this))
  }

  onSelect(e){
    e.preventDefault();
    $("a[data-type]", this.element).removeClass("active");
    var item = $(e.currentTarget);
    item.addClass('active');
    this.graph.setType(item.data('type'));
  }
}

module.exports = TypeSwitch;
