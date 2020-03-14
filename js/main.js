import $ from "jquery";
import { fabric } from "fabric";
import buildCanvas from "./buildCanvas.js";

$(document).ready( function(){

  let groundLine;
  let theMoon;
  const canvas = buildCanvas();

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
