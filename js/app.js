var canvas = document.getElementById('canvas');
var h1 = document.createElement("h1");
var p = document.createElement("p");
h1.append("Hello World!");
p.append("Inject the animation in here...");

canvas.append(h1, p);
