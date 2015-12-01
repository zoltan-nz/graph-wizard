import Ember from 'ember';

export default Ember.Controller.extend({

  polylinePoints: '60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145',

  polygonPoints: '50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180',

  pathD: 'M10 10 L40 40 L70 40 Q80 50, 90 80, T200 20'

});
