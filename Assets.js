let sprites             = {};
let assetStillLoading   = 0;

function assetsLoadingLoop(callback){

    if(assetStillLoading){
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        callback();
    }

}

function loadAssets(callback){

    function loadSprite(fileName){
        assetStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "./assets/sprites/" + fileName;

        spriteImage.onload = function(){
            assetStillLoading--;
        }

        return spriteImage;
    }

    sprites.background  = loadSprite('spr_background4.png');
    sprites.stick       = loadSprite('spr_stick.png');
    sprites.whiteBall   = loadSprite('spr_ball2.png');
    sprites.redBall     = loadSprite('spr_redBall2.png');
    sprites.yellowBall  = loadSprite('spr_yellowBall2.png');
    sprites.blackBall   = loadSprite('spr_blackBall2.png');

    assetsLoadingLoop(callback);
}

function getBallSpriteByColor(color){


        case COLOR.RED:
            return sprites.redBall;
        case COLOR.YELLOW:
            return sprites.yellowBall;
        case COLOR.BLACK:
            return sprites.blackBall;
        case COLOR.WHITE:
            return sprites.whiteBall;
    }
}