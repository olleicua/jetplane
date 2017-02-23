(function() {

  debug();

  var testCurve = QuadraticCurve.build(
    Point.build(-0.1, 0),
    Point.build(0, 0.1),
    Point.build(0.1, 0)
  );

  //testCurve.draw();
  testCurve.animate(2000);

  var testLine = LineCurve.build(
    Point.build(0, -0.25),
    Point.build(0, -0.1)
  );

  testLine.animate(2000);

})();
