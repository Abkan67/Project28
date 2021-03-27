class Chain {
    constructor(body1,offSetB, leng, stiff) {
        this.body1 = body1; this.body2=offSetB;
        this.chain = Constraint.create({
            bodyA: body1,
            pointB: offSetB,
            length: leng,
            stiffness: stiff
        })
        World.add(world, this.chain);
    }
    display() {
    push();  
    stroke(0);
    strokeWeight(4);
    line(this.body1.position.x, this.body1.position.y, this.body2.x, this.body2.y);
    pop();
    }
    release() {
        this.chain.bodyA=null;
    }

}