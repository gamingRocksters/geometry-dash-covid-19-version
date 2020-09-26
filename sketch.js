var player,playerImage;
var ground;
var back,backImage;
var invisibleHeader;
var coronaGroup,coronaImage;
var coronaGroup2,coronaImage1;
var score ;
var gameState = "Startup";

var play,playImage;
var logo,logoImage;
var lose,loseImage;
var relose,reloseImage;

var coronaVersion = "CORONA VERSION";
var coronaMsg = "Help Dash escape Corona";
var coronaMsg2 = "Press'space'button to fly and dodge!!";

 //var soundMsg;




function preload(){
  
  playerImage = loadImage("player.png");
  backImage = loadImage("background.jpg");
  coronaImage = loadImage("corona.png");
  coronaImage1 = loadImage("virus.png");
  
  playImage = loadImage("play.png");
  logoImage = loadImage("Logo.png");
  
  loseImage = loadImage("lose.jpg");
  reloseImage = loadImage("restart.png");
  
  // soundMsg = loadSound("BoxCat_Games_-_15_-_Meeting_MtFox.mp3");

}
function setup() {
  createCanvas(450, 300);
  
  
          back = createSprite(225,150);
        back.addImage(backImage);
        back.scale = 0.8;
   
        play = createSprite(225,200);
        play.addImage(playImage);
        play.scale = 0.3;
  
        logo = createSprite(225,100);
        logo.addImage(logoImage);
        logo.scale = 0.7;

        player = createSprite(40,200);
        player.addImage(playerImage);
        player.scale = 0.15;
        player.debug = false;
        player.setCollider("rectangle",0,0,220,220);

        ground = createSprite(225,285,450,30);
        ground.shapeColor = "#20124D";

        invisibleHeader = createSprite(225,3,450,1);
        invisibleHeader.visible = false;
  
  coronaGroup = new Group();
  coronaGroup2 = new Group();
        
 lose = createSprite(225,150);
  lose.addImage(loseImage);
  lose.scale = 0.5;
  lose.visible = false;
  
    relose = createSprite(225,250);
    relose.addImage(reloseImage);
    relose.scale = 0.5;
    relose.visible = false;
     
     score = 0;
  
     // soundMsg.loop();
  
}

function draw() {
  background(0);
  
 
 
   
  if(mousePressedOver(play)){
    gameState = "play";
  }
 
 
  if(gameState ==="play"){
    player.visible = true;
    ground.visible = true;
   
    coronaVersion = "";
    coronaMsg = "";
       coronaMsg2 = "";
    
      coronaVirus();
    coronaVirus2();
    
    back.visible = true;
    relose.visible = false;
    lose.visible= false;
         back.velocityX = -5;
     if(back.x<80){
       back.x = 320;
  }
     if(keyDown("space")||keyDown("up_arrow")){
    player.velocityY = -15;
  }
   
    
      score = score + Math.round(frameCount/60);
     play.destroy();
     logo.destroy();
    
    if(player.isTouching(coronaGroup)||player.isTouching(coronaGroup2)){
      gameState = "end";
       }
     
  }
  if(gameState === "end"){
    player.visible = false;
    player.velocityY = 0;
    
    lose.visible = true;
  
    relose.visible = true;
      
    back.visible = false;
    coronaGroup.destroyEach();
    coronaGroup2.destroyEach();
    ground.visible = false;
    
     
    
  
  }
 
  if(mousePressedOver(relose)){
    gameState = "play";
       score = 0;
  }
 
  
 
  player.velocityY = player.velocityY+1;
  
  player.collide(ground);
  player.collide(invisibleHeader);
  
 

  

  
  drawSprites();
  
        fill("white");
  textSize(20); 

  text("SCORE: "+score,270,30);
  text(coronaVersion,130,160);
 text(coronaMsg,100,260);
  text(coronaMsg2,50,60);

}

function coronaVirus(){
 
 if(frameCount % 20 === 0 ){
  
    var  corona = createSprite(500,150,10,10);
  corona.addImage(coronaImage);
  corona.scale = 0.2;
  
 
  corona.setCollider("circle",0,0,300);
  corona.velocityX = -20;
   corona.y = player.y;
   corona.lifetime = 23 ;
  
  coronaGroup.add(corona);

  }
}

 function coronaVirus2(){
 
  if(frameCount % 125 === 0 ){
   var corona1 = createSprite(450,150,10,10);
   corona1.addImage(coronaImage1);
corona1.scale = 0.1;
   
  corona1.setCollider("circle",0,0,300);
  corona1.velocityX = -15;
    corona1.y = player.y;
     corona1.lifetime = 34 ;
 
     coronaGroup2.add(corona1);
   }
  
}
