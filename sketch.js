//creating balloons' sprites
var r_balloon,g_balloon,b_balloon,p_balloon,bow,arrow;
var select_balloon,rand;
var score = 0, bg;
var redB, greenB, blueB, pinkB, arrowGroup;
var arrowhit, popsound;

//preloading the images
function preload()
{
  bg_image=loadImage("background0.png");
  red=loadImage("red_balloon0.png");
  green=loadImage("green_balloon0.png");
  blue=loadImage("blue_balloon0.png");
  pink=loadImage("pink_balloon0.png");
  bow_png=loadImage("bow0.png");
  arrow_png = loadImage("arrow0.png");
  arrowhit = loadSound("arrow-hit.mp3");
  popsound = loadSound("pop.mp3");
}

function setup() 
{
  createCanvas(400, 400);
  
  //background image
  bg = createSprite(0,0,400,400);
  bg.addImage(bg_image);
  bg.x = bg.width/2;
  bg.scale = 2;   
  
  //creating bow
  bow = createSprite(380,200);
  bow.addImage(bow_png);  
  
  //creating groups for each balloon colour and arrows
  redB = new Group();
  greenB = new Group();
  blueB = new Group();
  pinkB = new Group();  
  arrowGroup = new Group();  
}

function draw() {  
  //giving velocity to the background
  bg.velocityX = -2;
  if(bg.x<0)
     bg.x=bg.width/2;
  
  //bow following the mouse' y position
  bow.y=mouseY;
  
  //shooting arrows
  if(touches>World.x)
  {
    arrowhit.play();  
    shooting_arrows();
    touches = [];
  }  
  
  //random color balloon picker and spawning balloons after 80 frames
  select_balloon = Math.round(random(1,4));
  if (World.frameCount%80==0) 
  {
    switch(select_balloon)
      {
        case 1:b_red();
        break;
        case 2:b_green();
        break;
        case 3:b_blue();
        break;
        case 4:b_pink();
        break;
    }
  }
  
  //random y-position for balloons
  rand = Math.round(random(70,370));

  //increasing score when arrow touches the balloons
  if(arrowGroup.isTouching(redB))
  {
    redB.destroyEach();
    arrowGroup.destroyEach();
    popsound.play();
    score+=1;
  }
  if(arrowGroup.isTouching(greenB))
  {
    greenB.destroyEach();
    arrowGroup.destroyEach();
    popsound.play();
    score+=2;
  }
  if(arrowGroup.isTouching(blueB))
  {
    blueB.destroyEach();
    arrowGroup.destroyEach();
    popsound.play();
    score+=3;
  }
  if(arrowGroup.isTouching(pinkB))
  {
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    popsound.play();
    score+=4;
  }
  
  drawSprites();
  
  //Displaying score
  fill(rgb(237,33,92));
  rect(267.5,15,60,20);
  fill("LawnGreen");
  textSize = 20;
  text("Score : " + score,270,30);
}

function shooting_arrows() {
      
  //creating the arrows
  arrow = createSprite(380,bow.y);
  arrow.setCollider("rectangle",0,0,200,50);
  arrow.scale = 0.3;
  arrow.addImage(arrow_png);
  arrow.velocityX=-6;
  arrow.lifetime = 150;
  arrowGroup.add(arrow);
}

function b_red() {
  r_balloon = createSprite(20,rand);
  r_balloon.addImage(red);
  r_balloon.scale = 0.07;
  r_balloon.velocityX = 3;
  r_balloon.lifetime = 150;
  redB.add(r_balloon);
}

function b_green() {
  g_balloon = createSprite(20,rand);
  g_balloon.addImage(green);
  g_balloon.scale = 0.07;
  g_balloon.velocityX = 3;
  g_balloon.lifetime = 150;
  greenB.add(g_balloon);
}

function b_blue() {
  b_balloon = createSprite(20,rand);
  b_balloon.addImage(blue);
  b_balloon.scale = 0.08;
  b_balloon.velocityX = 3;
  b_balloon.lifetime = 150;
  blueB.add(b_balloon);
}

function b_pink() {
  p_balloon = createSprite(20,rand);
  p_balloon.addImage(pink);
  p_balloon.scale = 0.9;
  p_balloon.velocityX = 3;
  p_balloon.lifetime = 150;
  pinkB.add(p_balloon);
}
