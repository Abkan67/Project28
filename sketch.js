
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var rockpos = {x:null, y:null};
var hasLaunched = false;
var treeimg, boyimg, mangoimg, stoneimg;
var stone;
var mangos = [];
var chains = [];
var arm;
function preload(){
	treeimg = loadImage("tree.png");
	boyimg = loadImage("boy.png");
	mangoimg = loadImage("mango.png");
	stoneimg = loadImage("stone.png");
}

function setup() {
	createCanvas(800, 500);
	engine = Engine.create();
	world = engine.world;
	document.getElementById("defaultCanvas0").style.borderWidth="2px";
	document.getElementById("defaultCanvas0").style.borderColor="black";
	document.getElementById("defaultCanvas0").style.borderStyle="solid";

	World.add(world, Bodies.rectangle(400,550,800,100));

imageMode(CENTER);

	stone = Bodies.circle(50,275,50,{restitution:0,friction:1,density:1.2, isStatic:false})
	World.add(world, stone);

    makeMango(600,250);
	makeMango(700,300);
	makeMango(630,320);
	makeMango(480,270);
	arm = new Chain(stone, {x:120,y:410}, 2, 1)
	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(255);

  image(treeimg, 600,350,300,330);
  if (!hasLaunched) {Matter.Body.setPosition(stone, rockpos);}
  image(stoneimg, stone.position.x,stone.position.y,50,50);
  image(boyimg, 150,450,100,175);

  mangos.forEach((mango,i)=>{mango.display();})
  chains.forEach((chain,i)=>{chain.display();})
  if (!hasLaunched){
  arm.display();}
}

function makeMango(xn,yn) {
	var newmango = new Mango(xn,yn);
	mangos.push(newmango);
	var newchain = new Chain(newmango.body, {x:xn,y:yn}, 20, 1)
	chains.push(newchain);
	newmango.branch = newchain;
}

function cirColliding(x1,y1,r1,x2,y2,r2){
	var distanceX=x1-x2; var distanceY=y1-y2;
	var distance = Math.hypot(distanceX, distanceY);
	return distance <= r1+r2;
  }

function mouseDragged(e) {
	rockpos = {x:e.x, y:e.y};
}

function mouseReleased(e) {
	hasLaunched = true;
	setTimeout(()=>{arm.release(); setTimeout(()=>{hasLaunched=false; arm.chain.bodyA=stone;},5000)
	},0);
}