(function() {

  var ANIMATION_INTERVAL = 1;

  var svg = document.querySelector('svg');

  window.Curve = {};
  Curve.build = function() {
    var newCurve = Object.create(this);
    newCurve.points = Array.prototype.slice.call(arguments);
    return newCurve;
  };
  Curve.draw = function(progress) {
    if (progress == null) progress = 1;

    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.el.setAttributeNS(null, 'fill', 'none');
    this.el.setAttributeNS(null, 'stroke', 'black');
    this.el.setAttributeNS(null, 'd', this.d(progress));
    svg.appendChild(this.el);
  };
  Curve.d = function(progress) {
    if (progress === 1) {
      var points = this.points;
    } else {
      var points = this.partialPoints(progress);
    }

    var i = 0;
    return this.dFormat.replace(/~/g, function() {
      var p = points[i];
      i++;
      return p.stringForPath();
    });
  };
  Curve.animate = function(time) {
    var that = this;

    if (this.animating) throw "ONLY ONE ANIMATION AT A TIME PLEASE!";

    this.animating = true;
    this.animationStart = performance.now();
    this.animationStop = this.animationStart + time;

    this.draw(0);
    setTimeout(function() { that.stepAnimation(); }, ANIMATION_INTERVAL);
  };
  Curve.stepAnimation = function() {
    var that = this;

    if (!this.animating) return;

    var now = performance.now();
    if (now >= this.animationStop) {
      this.animating = false;
      this.animationStart = null;
      this.animationStop = null;

      this.el.setAttributeNS(null, 'd', this.d(1));
    } else {
      var progress =
          (now - this.animationStart) /
          (this.animationStop - this.animationStart);

      this.el.setAttributeNS(null, 'd', this.d(progress));
      setTimeout(function() { that.stepAnimation(); }, ANIMATION_INTERVAL);
    }
  };

  window.LineCurve = Object.create(window.Curve);
  LineCurve.dFormat = 'M~ L ~';
  LineCurve.partialPoints = function (progress) {
    return [
      this.points[0],
      this.points[0].progressTo(this.points[1], progress)
    ];
  };

  window.QuadraticCurve = Object.create(window.Curve);
  QuadraticCurve.dFormat = 'M~ Q ~, ~';
  QuadraticCurve.partialPoints = function (progress) {
    var midpoint = this.points[0].progressTo(this.points[1], progress);
    var endpoint = midpoint.progressTo(
      this.points[1].progressTo(this.points[2], progress),
      progress
    );

    return [this.points[0], midpoint, endpoint];
  };

  window.CubicCurve = Object.create(window.Curve);
  CubicCurve.dFormat = 'M~ C ~, ~, ~';

  //window.ArcCurve = Object.create(window.Curve);
  //LineCurve.dFormat = 'M~ A ~ ~ ~ ~ ~ ~ ~';

})();
