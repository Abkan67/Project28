class Mango {
    constructor(x,y) {
        this.branch; this.ded=false;
        this.body = Bodies.circle(x,y,40,{restitution:0, friction:1})
        World.add(world, this.body);
    }
    display() {
        if(!this.ded) {
        push();
        translate(this.body.position.x,this.body.position.y)
        rotate(degrees(this.body.angle));
        image(mangoimg,0,0,30,30);
        pop();
        }
        var spos = stone.position;
        if(cirColliding(spos.x,spos.y,55,this.body.position.x,this.body.position.y,40)) {
            this.branch.release(); this.ded = true;
        }
    }
}