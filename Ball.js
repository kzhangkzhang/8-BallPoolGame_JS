const BALL_ORIGIN   = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS   = BALL_DIAMETER/2;

function Ball(position, color){
    this.position = position;
    this.velocity = new Vector2();
    this.moving   = false;
    this.sprite  = getBallSpriteByColor(color);
}

// method update()
Ball.prototype.update = function(delta){
    this.position.addTo(this.velocity.mult(delta));

    // Apply friction
    this.velocity = this.velocity.mult(0.984);

    if(this.velocity.length() < 5 ){
        this.velocity = new Vector2();
        this.moving   = false;
    }
}

// method draw()
Ball.prototype.draw = function(){
    Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
}

Ball.prototype.shoot = function(power, rotation){
    console.log("shooting ...");

    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
    this.moving   = true;

}

Ball.prototype.collideWithBall = function(ball){

    // find a normal vector
    const n = this.position.substract(ball.position);

    // Find distance
    const dist = n.length();

    if (dist > BALL_DIAMETER){
        return; 
    }

    // Find minimum translation distance
    const mtd = n.mult((BALL_DIAMETER - dist) /dist);

    // Push-pull balls apart
    this.position = this.position.add(mtd.mult(1/2));
    ball.position = ball.position.substract(mtd.mult(1/2));

    // Find unit normal vector
    const un = n.mult(1/n.length());

    // Find unit tangent vector
    const ut = new Vector2(-un.y, un.x);

    // Project velocities onto the unit normal and unit tangit vectors
    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    // Find new normal velocities
    let v1nTag = v2n;
    let v2nTag = v1n;

    // Convert the scalar normal and tangentia velocities into vectors
    v1nTag          = un.mult(v1nTag);
    v2nTag          = un.mult(v2nTag);

    const v1tTag    = ut.mult(v1t);
    const v2tTag    = ut.mult(v2t);

    // Update velocities
    this.velocity   = v1nTag.add(v1tTag);
    ball.velocity   = v2nTag.add(v2tTag);

    this.moving     = true;
    ball.moving     = true;
    
}


Ball.prototype.collideWithTable = function(table){

    if(!this.moving){
        return;
    }

    let collided = false;

    if(this.position.y <= table.TopY + BALL_RADIUS){
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x >= table.RightX - BALL_RADIUS){
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(this.position.y >= table.BottomY - BALL_RADIUS){
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x <= table.LeftX + BALL_RADIUS){
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(collided){
        this.velocity = this.velocity.mult(.98);
    }

}

Ball.prototype.collideWith = function(object){

    if(object instanceof Ball){
        this.collideWithBall(object);
    } 
    else{
        this.collideWithTable(object);
    }


}