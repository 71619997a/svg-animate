var canvas = document.getElementById("svgcanvas");
var ns = "http://www.w3.org/2000/svg";
var mode = 'circle';
var requestID;
var width = canvas.width.animVal.value;
var height = canvas.height.animVal.value;
var stopButton = document.getElementById( "stop" );
var growButton = document.getElementById( "grow" );
var bounceButton = document.getElementById( "bounce" );

var circle = function() {
    window.cancelAnimationFrame( requestID );
    clear();
    var circ = document.createElementNS(ns, 'circle');
    circ.setAttribute('cx', width / 2);
    circ.setAttribute('cy', height / 2);
    var r = 25;
    var inc = 1;
    circ.setAttribute('r', r);
    circ.setAttribute('stroke', 'black');
    circ.setAttribute('fill', 'yellow');
    canvas.appendChild(circ);
    var tick = function() {
    	r += inc;
    	if (r <= 0 || r >= Math.min(width, height) / 2)
    	    inc = -inc;
    	circ.setAttribute('r', r);
    	requestID = window.requestAnimationFrame(tick);
    }
    tick();
}

var bounce = function() {
    window.cancelAnimationFrame( requestID );
    clear();
    var logo = document.createElementNS(ns, 'image');
    logo.setAttribute('href', 'DVD_Logo.png');
    var x = 100;
    var y = 150;
    var lw = 200;
    var lh = 98;
    var xvel = 1;
    var yvel = 1;
    logo.setAttribute('x', x);
    logo.setAttribute('y', y);
    logo.setAttribute('width', lw);
    logo.setAttribute('height', lh);
    canvas.appendChild(logo);
    var tick = function() {
        console.log(x,y);
    	x += xvel;
    	y += yvel;
    	if(x >= width - lw || x <= 0)
    	    xvel = -xvel;
    	if(y >= height - lh || y <= 0)
    	    yvel = -yvel;
    	logo.setAttribute('x', x);
    	logo.setAttribute('y', y);
    	requestID = window.requestAnimationFrame(tick);
    }
    tick();
}
	    
    
canvas.addEventListener("click", function(e) {
    if(mode == 'circle')
	   circle();
    else
	   bounce();
});

clear = function() {
    canvas.innerHTML = '';
}

stopButton.addEventListener("click", function(e) {
    e.preventDefault();
    window.cancelAnimationFrame(requestID);
});

growButton.addEventListener( "click",  function() {
    mode = "circle";
    circle();
    window.cancelAnimationFrame(requestID);
});
bounceButton.addEventListener( "click", function() {
    mode = "bounce";
    bounce();
    window.cancelAnimationFrame(requestID);
});
