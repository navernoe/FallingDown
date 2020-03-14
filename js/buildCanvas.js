import $ from "jquery";

const disableMoveOffCanvas = (canvas) => {
    canvas.on('object:moving', function (e) {
        const obj = e.target;
        const boundingRect = obj.getBoundingRect();
        const rectTop = boundingRect.top;
        const rectLeft = boundingRect.left;
        const rectWidth = boundingRect.width;
        const rectHeight = boundingRect.height;

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

export default () => {
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
    disableMoveOffCanvas(canvas);

    return canvas;
};
