var trex, trexRunning
var ground, groundImage, groundInvisible
var score
var cloudImage, cloudGroup
var obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6, obstacleGroup
var PLAY = 1
var END = 0
var gameState = PLAY
var gameOver
var gameOverImage
var restart
var restartImage



function preload() {
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacleImage1 = loadImage ("obstacle1.png")
  obstacleImage2 = loadImage ("obstacle2.png")
  obstacleImage3 = loadImage ("obstacle3.png")
  obstacleImage4 = loadImage ("obstacle4.png")
  obstacleImage5 = loadImage ("obstacle5.png")
  obstacleImage6 = loadImage ("obstacle6.png")
  gameOverImage = loadImage ("gameOver.png")
  restartImage = loadImage ("restart.png")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 150, 20, 50);
  trex.scale = 0.5
  trex.addAnimation("running", trexRunning)
  ground = createSprite(300, 180, 600, 10)
  ground.addImage("moving", groundImage)
  ground.velocityX = -2
  groundInvisible = createSprite(300, 185, 600, 10)
  groundInvisible.visible = false
  score = 0;
  cloudGroup = new Group();
  obstacleGroup = new Group();
  gameOver = createSprite (300,100,10,10)
  gameOver.scale = 0.5
  gameOver.visible = false
  restart = createSprite (300,125,10,10)
  restart.scale = 0.5
  restart.visible = false
  gameOver.addImage(gameOverImage)
  restart.addImage(restartImage)

}

function draw() {
  background("white");
  drawSprites();

  text("Score: " + score, 450, 35)

  trex.collide(groundInvisible)

  if (gameState === PLAY) {
    spawnClouds();
    spawnObstacles();
    trex.velocityY = trex.velocityY + 0.5
    score = Math.round(frameCount / 4);

    if (keyDown("Space") && (trex.y > 156)) {
      trex.velocityY = -12
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    
    if (trex.isTouching(obstacleGroup)){
      gameState = END;
      
      
    }
  
    

  } else if (gameState === END) {
    trex.velocityY = 0;
    ground.velocityX = 0;
    gameOver.visible = true
    restart.visible = true
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)

  }

  //console.log(Math.round(frameCount / 4))
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var rand = random(80, 120)

    var cloud = createSprite(600, 120, 40, 10)
    cloud.y = rand
    cloud.velocityX = -2
    cloud.addImage(cloudImage)
    cloud.scale = 0.5
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloudGroup.add(cloud)

  }

}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var rand =Math.round(random (1,6))

    var obstacle = createSprite(600, 165, 10, 40)
    obstacle.velocityX = -3
    if (rand === 1){
      obstacle.addImage(obstacleImage1)
    }
    else if(rand === 2){
      obstacle.addImage(obstacleImage2)
    }
    else if(rand === 3){
      obstacle.addImage(obstacleImage3)
    }
    else if(rand === 4){
      obstacle.addImage(obstacleImage4)
    }
    else if(rand === 5){
      obstacle.addImage(obstacleImage5)
    }
    else if(rand === 6){
      obstacle.addImage(obstacleImage6)
    }
    obstacle.scale = 0.5
    obstacleGroup.add(obstacle)
    //console.log(rand)
  }
}