(function() {

  window.debug = function() {

    var svg = document.querySelector('svg');

    var debug = document.createElement('div');
    debug.className = 'debug';
    debug.innerHTML = Point.build(0, 0).stringForDebug();
    document.body.appendChild(debug);

    svg.addEventListener('mousemove', function(e) {
      debug.innerHTML =
        Point.buildFromAbsolute(e.offsetX, e.offsetY).stringForDebug();
    });

  };

})();
