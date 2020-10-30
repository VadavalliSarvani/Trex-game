 var trex, trex_running, trex_collided;
 var ground, invisibleGround, groundImage;
 var cloudGroup;
 var obstacleGroup;
 var gamestate;
 var score = 0;
 var gameoverImage;
 var restartImage;
 var gameover;
 var restart;

 function preload() {
   trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
   trex_collided = loadImage("trex_collided.png");

   groundImage = loadImage("ground2.png");

   cloudImage = loadImage("cloud.png");

   obstacleImage1 = loadImage("obstacle1.png");
   obstacleImage2 = loadImage("obstacle2.png");
   obstacleImage3 = loadImage("obstacle3.png");
   obstacleImage4 = loadImage("obstacle4.png");
   obstacleImage5 = loadImage("obstacle5.png");
   obstacleImage6 = loadImage("obstacle6.png");
   
   gameoverImage=loadImage("gameOver.png");
   restartImage=loadImage("restart.png");
 }

 function setup() {
   createCanvas(600, 200);

   trex = createSprite(50, 180, 20, 50);
   trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided);
   trex.scale = 0.5;

   ground = createSprite(200, 180, 400, 20);
   ground.addImage("ground", groundImage);
   ground.x = ground.width / 2;
   ground.velocityX = -2;

   invisibleGround = createSprite(200, 190, 400, 10);
   invisibleGround.visible = false;
   
   gameover=createSprite(300,100,10,10);
   gameover.addImage("gameover",gameoverImage);
   gameover.scale=0.5;
   gameover.visible=false;
   
   restart=createSprite(300,130,10,10);
   restart.addImage("restart",restartImage);
   restart.scale=0.4;
   restart.visible=false;

   cloudGroup = new Group();
   obstacleGroup = new Group();
   gamestate = "play";
 }

 function draw() {
   background(180);

   trex.collide(invisibleGround);

   if (gamestate == "play") {

     score = score + 1;

     ground.velocityX = -2;
     if (keyDown("space")) {
       trex.velocityY = -10;
     }

     trex.velocityY = trex.velocityY + 0.8

     if (ground.x < 0) {
       ground.x = ground.width / 2;
     }


   spawnClouds();

   spawnObstacle();
     
   trex.setCollider("circle",0,0,40);
   if(trex.isTouching(obstacleGroup)){
     trex.changeAnimation("collided");
      gamestate="end";
  }
   }
      if(gamestate=="end"){
    //to stop the ground
    ground.velocityX=0;
    
    //stop clouds and obstacles movement
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    gameover.visible=true;
    restart.visible =true;
        
   if(mousePressedOver(restart)){
     restartgame();
    }
   }
    text("score"+score,550,30);
   drawSprites();
 }

 function spawnClouds() {
   if (World.frameCount % 100 == 0) {
     var r = Math.round(random(50, 100));
     var cloud = createSprite(600, r, 10, 10);
     cloud.addImage("cloud", cloudImage);
     cloud.velocityX = -2;
     cloud.depth = trex.depth;
     trex.depth = trex.depth + 1;
     // lifetime=distance/speed
     cloud.lifetime = 600 / 2;

     //add cloud to the cloud group
     cloudGroup.add(cloud);
   }
 }

 function spawnObstacle() {
   if (World.frameCount % 100 == 0) {
     var r = Math.round(random(1, 6));
     var obstacle = createSprite(600, 170, 10, 10);
     if (r === 1) {
       obstacle.addImage("obstacle", obstacleImage1);
     }
     if (r === 2) {
       obstacle.addImage("obstacle", obstacleImage2);
     }
     if (r === 3) {
       obstacle.addImage("obstacle", obstacleImage3);
     }
     if (r === 4) {
       obstacle.addImage("obstacle", obstacleImage4);
     }
     if (r === 5) {
       obstacle.addImage("obstacle", obstacleImage5);
     }
     if (r === 6) {
       obstacle.addImage("obstacle", obstacleImage6);
     }
     obstacle.scale = 0.75;

     obstacle.velocityX = -6;
     obstacle.lifetime = 600 / 4;

     //add obstacle to the obstacle group
     obstacleGroup.add(obstacle);
   }
 }

function restartgame(){
      cloudGroup.destroyEach();
      obstacleGroup.destroyEach();
      trex.changeAnimation("running"); 
      gamestate="play"
      score=0;
      gameover.visible=false;
      restart.visible=false;
  
} 