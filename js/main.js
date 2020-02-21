const disableMoveOver = (canvas) => {
    canvas.on('object:moving', function (e) {
        const obj = e.target;
        const rectTop = obj.getBoundingRect().top;
        const rectLeft = obj.getBoundingRect().left;
        const rectWidth = obj.getBoundingRect().width;
        const rectHeight = obj.getBoundingRect().height;

        obj.setCoords();

        //top-left corner
        if ( rectTop < 0 || rectLeft < 0 ){
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
};

const buildCanvas = () => {
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

    // скрываем подсказку
    canvas.on('object:moving', function () {
        $( "#tip p" ).text("");
    });

    // запрещаем перемещение луны за пределы canvas
    disableMoveOver(canvas);

    return canvas;
};


$(document).ready( function(){

    const startFall = () => {
        const moonY = theMoon.top + (theMoon.scaleY * theMoon.height);

        // если луна над землей
        if ( moonY < groundLine ) {

            // отключаем кнопку во время анимации
            $( "#startBtn" ).addClass("disabled");
            $( "#startBtn" ).off("click");

            theMoon.animate('top', groundLine, {
                duration: 2000,
                onChange: canvas.renderAll.bind(canvas),
                easing: fabric.util.ease.easeOutBounce,
                onComplete: function() {
                    // включаем кнопку обратно и выводим подсказку
                    $( "#startBtn" ).removeClass("disabled");
                    $( "#startBtn" ).click(() => startFall());
                    $( "#tip p" ).text("Get the Moon UP and try again!");
                }
            });
        }
    };

    const canvas = buildCanvas();
    let groundLine;

    fabric.Image.fromURL('img/theMoon.png', function (moonImg) {
        theMoon = new fabric.Image(moonImg.getElement());
        theMoon.hasBorders = false;
        theMoon.hasControls = false;
        theMoon.scale(0.06);
        canvas.add(theMoon);
        groundLine = canvas.height - (theMoon.height * theMoon.scaleY) - 20;
        theMoon.center();
    });

    $( "#startBtn" ).click(() => startFall());

})