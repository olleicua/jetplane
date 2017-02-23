(function() {

  window.Point = {
    build: function(x, y) {
      var newPoint = Object.create(this);
      newPoint.x = x;
      newPoint.y = y;
      return newPoint;
    },
    buildFromAbsolute: function(x, y) {
      var newPoint = Object.create(this);
      newPoint.x = ((x * 2) / window.innerWidth) - 1;
      newPoint.y = 1 - ((y * 2) / window.innerHeight);
      return newPoint;
    },
    stringForPath: function() {
      var absoluteX = (1 + this.x) * (window.innerWidth / 2)
      var absoluteY = (1 - this.y) * (window.innerHeight / 2)

      return absoluteX + ' ' + absoluteY;
    },
    stringForDebug: function() {
      return 'X=' + Math.round(this.x * 100) / 100 +
        ' Y=' + Math.round(this.y * 100) / 100;
    },
    progressTo: function(destination, progress) {
      return Point.build(
        this.x + ((destination.x - this.x) * progress),
        this.y + ((destination.y - this.y) * progress)
      )
    }
  };

})();
