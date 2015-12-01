# Graph-Wizard

More about SVGs:

https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
http://www.w3schools.com/svg/


###1. Install bootstrap

```
ember install ember-cli-sass && ember install ember-cli-bootstrap-sassy && echo '@import "bootstrap";' > ./app/styles/app.scss && rm ./app/styles/app.css
```

Add a custom css:

``` css
.grey-bg {
  background: #dddddd;
}

.nav {
  margin: 10px 0px;
}
```

2. SVG basic elements:

Let's create a route first. 'basics'

```
ember g route basics
```

Add a little menu to `application.hbs`.

```
<div class="container">

  <ul class="nav nav-pills">
    <li>{{link-to 'Home' 'index'}}</li>
    <li>{{link-to 'Basics' 'basics'}}</li>
  </ul>

  {{outlet}}

</div>
```

Add basic shapes to `templates/basics.hbs`
Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes

```
<div class="row">
  <div class="col-md-8">

    <svg width="300" height="300">
      <circle cx="100" cy="100" r="50" stroke="black" stroke-width="5" fill="grey" />
    </svg>

    <svg width="300" height="300">
      <rect x="75" y="75" rx='4' ry='4' width="50" height="50" fill="grey" stroke="black" stroke-width="5"/>
    </svg>

    <svg width="300" height="300">
      <line x1="0" y1="0" x2="50" y2="50" stroke="black" stroke-width="5"/>
    </svg>

    <svg width="300" height="300">
      <polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140 90 135 95 150 100 145"
                stroke="orange" fill="transparent" stroke-width="5"/>
    </svg>

    <svg width="300" height="300">
      <polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"
               stroke="green" fill="transparent" stroke-width="5"/>
    </svg>

    <svg width="200" height="200">
      <path d="M10 10 L40 40 L70 40 Q80 50, 90 80, T200 20"/>
    </svg>

  </div>
  <div class="col-md-4">

  </div>
</div>

```

Add some ember magic with sliders and input boxes.

First install the `ember-ui-slider` addon. 
(Search: http://www.emberaddons.com/?query=slider)

```
ember install ember-ui-slider
```

More info: https://github.com/lifegadget/ui-slider

Update `templates/basics.hbs`

```html
<div class="row">
  <div class="col-md-8">

    <svg width="{{width}}" height="{{height}}" class="grey-bg">
      <circle cx="100" cy="100" r="{{radius}}" stroke="black" stroke-width="5" fill="grey" />
    </svg>

    <svg width="{{width}}" height="{{height}}" class="grey-bg">
      <rect x="75" y="75" rx='4' ry='4' width="{{radius}}" height="{{radius}}" fill="grey" stroke="black" stroke-width="5"/>
    </svg>

    <svg width="{{width}}" height="{{height}}" class="grey-bg">
      <line x1="0" y1="0" x2="{{length}}" y2="{{length}}" stroke="black" stroke-width="5"/>
    </svg>

    <svg width="{{width}}" height="{{height}}" class="grey-bg">
      <polyline points="{{polylinePoints}}"
                stroke="orange" fill="transparent" stroke-width="5"/>
    </svg>

    <svg width="{{width}}" height="{{height}}" class="grey-bg">
      <polygon points="{{polygonPoints}}"
               stroke="green" fill="transparent" stroke-width="5"/>
    </svg>

    <svg width="{{width}}" height="{{height}}" class="grey-bg">
      <path d="{{pathD}}" fill="none" stroke="blue" stroke-width="5"/>
    </svg>


  </div>
  <div class="col-md-4">

    Width:
      {{ui-slider
          value=width
          defaultValue=300
          min=1
          max=500
          step=1}}

    Height:
      {{ui-slider
        value=height
        defaultValue=300
        min=1
        max=500
        step=1}}

    Radius:
      {{ui-slider
          value=radius
          defaultValue=50
          min=1
          max=500
          step=1}}

    Line length:
      {{ui-slider
        value=length
        defaultValue=50
        min=1
        max=500
        step=1}}

    Polyline: {{input value=polylinePoints class='form-control'}}
    Polygon: {{input value=polygonPoints class='form-control'}}
    Path: {{input value=pathD class='form-control'}}

  </div>
</div>
```

Generate a `basics` controller:

```
ember g controller basics
```

Add default values:

```javascript
import Ember from 'ember';

export default Ember.Controller.extend({

  polylinePoints: '60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145',

  polygonPoints: '50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180',

  pathD: 'M10 10 L40 40 L70 40 Q80 50, 90 80, T200 20'

});
```

More about path:
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

###3. Add ember-cli-chart

Let's play with a great chart addon: ember-cli-chart
https://www.npmjs.com/package/ember-cli-chart

Install the addon:

```
ember install ember-cli-chart
```

Create a new route and page:

```
ember g route chart
```

Add to the menu in `application.hbs`

```
<div class="container">

  <ul class="nav nav-pills">
    <li>{{link-to 'Home' 'index'}}</li>
    <li>{{link-to 'Basics' 'basics'}}</li>
    <li>{{link-to 'Chart' 'chart'}}</li>
  </ul>

  {{outlet}}

</div>
```

Add a line chart component to `chart.hbs`

```
<div class="row">
  <div class="col-md-12">
    {{ember-chart type='Line' data=model width=500 height=300 legend=true}}
  </div>
</div>
```

Our model still empty, add some dummy data to model in our router.
Source: http://www.chartjs.org/docs/#line-chart-example-usage

```
// routes/chart.js
import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
  }

});
```
4. D3.js graph

* Generate chart2 route.
* Generate d3-chart component.

```
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
```

