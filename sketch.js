var towerImg, tower;
var doorImg, doorsGroup;
var climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup;

var spookySound;

var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  
  if (gameState === "play") {
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x-3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x+3;
    }
    
    ghost.velocityY = ghost.velocityY+0.8;
    
    if(tower.y > 400){
      tower.y = 300;
    }
    
    spawnDoors();
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
    
    spookySound.stop();
  }
}

function spawnDoors() {
  if(frameCount % 240 === 0){
    var door = createSprite(Math.round(random(120,400)),-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door);
    
    ghost.depth = door.depth+1;
    
    var climber = createSprite(door.x,10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 600;
    climbersGroup.add(climber);
    
    var invisibleBlock = createSprite(door.x, 15, climber.width,2);
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);
  }
}