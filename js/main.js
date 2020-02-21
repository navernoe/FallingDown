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

	// запрещаем перемещать объект за пределы canvas
	canvas.on('object:moving', function (e) {
		const obj = e.target;
		const rectTop = obj.getBoundingRect().top;
		const rectLeft = obj.getBoundingRect().left;
		const rectWidth = obj.getBoundingRect().width;
		const rectHeight = obj.getBoundingRect().height;

		//if object is too big ignore
		if (
			obj.currentHeight > obj.canvas.height
			|| obj.currentWidth > obj.canvas.width
		){
		    return;
		}

		obj.setCoords();

		//top-left corner
		if (
			rectTop < 0
			|| rectLeft < 0
		){
		    obj.top = Math.max(obj.top, obj.top - rectTop);
		    obj.left = Math.max(obj.left, obj.left - rectLeft);
		}

		//bot-right corner
		if (
			rectTop + rectHeight > obj.canvas.height
			|| rectLeft + rectWidth > obj.canvas.width
		){
		    obj.top = Math.min(
		    	obj.top,
		    	obj.canvas.height - rectHeight + obj.top - rectTop
		    );
		    obj.left = Math.min(
		    	obj.left,
		    	obj.canvas.width - rectWidth + obj.left - rectLeft
		    );
		}
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