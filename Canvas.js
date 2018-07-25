function Canvas2D(){
    this._canvas        = document.getElementById('screen');
    this._canvasContext = this._canvas.getContext('2d');
}

// clear the canvas
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
Canvas2D.prototype.clear = function (){
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.clientHeight);
}

// draw image on the canvas
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
Canvas2D.prototype.drawImage = function (image, position, origin, rotation = 0){

    if(!position){
        position = new Vector2();
    }

    if(!origin){
        origin = new Vector2();
    }

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);

    this._canvasContext.drawImage(image, -origin.x, -origin.y);
    this._canvasContext.restore();
}

let Canvas = new Canvas2D();


// // Testing
// let image = new Image();
// image.src = "./assets/sprites/spr_background4.png";


// setTimeout(()=> {
//     Canvas.drawImage(image, {x:0, y: 0});
//     Canvas.clear();
// }, 1000);