$(document).ready(function(){

	const canvas = new fabric.Canvas('FallField', {
		backgroundColor: '#eee',
		selection: false,
		skipOffscreen: true
	});

	canvas.setBackgroundImage('img/background.jpg', canvas.renderAll.bind(canvas), {
	   		width: canvas.width,
	   		height: canvas.height,
	   		originX: 'left',
	   		originY: 'top'
	});


	let theMoon;

	fabric.Image.fromURL('img/theMoon.png', function (moonImg) {
		theMoon = new fabric.Image(moonImg.getElement());
		theMoon.hasBorders = false;
		theMoon.hasControls = false;
		theMoon.scale(0.06);			
		canvas.add(theMoon);
		theMoon.center();
	});


    const startFall = (moon) => {
		moon.animate('top', 400, {
			duration: 2000,
		  	onChange: canvas.renderAll.bind(canvas),
		  	easing: fabric.util.ease.easeOutBounce
		});
	};

	$( "#startBtn" ).click(() => startFall(theMoon));

})