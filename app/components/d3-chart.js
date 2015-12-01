import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({

  tagName: 'svg',
  classNames: ['grey-bg'],
  width: '800',
  height: '500',

  attributeBindings: ['width', 'height'],

  didInsertElement() {
    let el = this.get('element');

    let xScale = d3.scale.linear().range([0,750]).domain([1,30]);
    let yScale = d3.scale.linear().range([0,446]).domain([100,0]);

    let xAxis = d3.svg.axis().scale(xScale).orient('bottom');
    let yAxis = d3.svg.axis().scale(yScale).orient('left');

    d3.select(el).append('g').attr('transform', 'translate(40,450)').call(xAxis);
    d3.select(el).append('g').attr('transform', 'translate(40,10)').call(yAxis);

    let line = d3.svg.line()
      .x(function(d) {return xScale(d.x)})
      .y(function(d) {return yScale(d.y)});

    let data = [{x: 2, y: 30}, {x: 3, y: 50}, {x: 4, y: 80}, {x: 5, y: 50}, {x: 15, y: 30}];

    d3.select(el).append('path')
      .attr('d', line(data))
      .attr('stroke', 'grey')
      .attr('stroke-width', 10)
      .attr('fill', 'none')
      .attr('transform', 'translate(40,10)');
  }

});
