var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

var sword, swordImage;

var fruit, fruit1, fruit2, fruit3, fruit4, randomFruit, fruitGroup;

var r;

var monster, monsterImage, enemyGroup, gameOver, gameOverImage;

var knifeSwooshSound, gameoverSound;

function preload()
{
  swordImage = loadImage ("sword.png");
  monsterImage = loadAnimation ("alien1.png", "alien2.png");
  fruit1 = loadImage ("fruit1.png");
  fruit2 = loadImage ("fruit2.png");
  fruit3 = loadImage ("fruit3.png");
  fruit4 = loadImage ("fruit4.png");
  gameOverImage = loadImage ("gameover.png");
  
  knifeSwooshSound = loadSound ("knifeSwooshSound.mp3");
  gameoverSound = loadSound ("gameover.mp3");
}

function setup() 
{
  createCanvas(600, 500);
  
  sword = createSprite (200, 200,12,80);
  sword.addImage("sword", swordImage);

  
  
  gameOver = createSprite (300, 250, 80, 80);
  gameOver.addImage ("gameover", gameOverImage);
  gameOver.visible = false;
  
  score = 0;  
  
  fruitGroup = new Group ();
  enemyGroup = new Group ();
}

function draw()
{
  background ("skyblue");

  
  text("Score:" + score, 300, 20 )
 

  if (gameState === PLAY)
    {
     fruits();
     Enemy();
      
      sword.y = mouseY
      sword.x = mouseX
     
      
   if (fruitGroup.isTouching(sword)) 
      {
        fruitGroup.destroyEach ();
        knifeSwooshSound.play();
        score=score+2;
      }
  
     if(enemyGroup.isTouching(sword))
     {
      gameState = END;
      gameoverSound.play();
     }
  }
  else if (gameState === END)
    {
      gameOver.visible = true;
      fruitGroup.setLifetimeEach(-1);
      fruitGroup.visible = false;
      sword.visible = false;
      
      if (sword.isTouching(monster)) 
      {
        fruitGroup.destroyEach ();
        fruitGroup.velocityX = 0;
      }
      
     if (sword.isTouching(monster)) 
      {
        enemyGroup.destroyEach ();
        enemyGroup.velocityX = 0;
      }
    
    }
    
       drawSprites(); 

}

function fruits()
{
 if (World.frameCount%20===0)
 {
     position = Math.round(random(1,2));
     fruit=createSprite(400, 200, 20, 20);
   fruit.scale= 0.21;
     
     r=Math.round (random(1,4));
     if (r==1)
     {
       fruit.addImage(fruit1);
     } 
     else if (r == 2) 
     {
       fruit.addImage(fruit2);
     }
   else if (r == 3) 
     {
       fruit.addImage(fruit3);
     }
   else if (r == 4) 
     {
       fruit.addImage(fruit4);
     }
   
    if (position==1)
   {
     fruit.x = 400;
     fruit.velocityX = -(7+(score/4)); 
   }
   else
     
       if(position==2) {
          fruit.x=0;
         fruit.velocityX = +(7+(score/4)); 
       }
     
   if (score > 4)
     {
       fruit.velocityX = fruit.velocityX*2;
     }
   fruitGroup.add(fruit);
   
 }
}

function Enemy ()
{
  if (World.frameCount%100===0)
    {
      monster=createSprite (400, 200, 20, 20);
      monster.addAnimation ("moving", monsterImage);
      monster.y = Math.round (random(100, 300));
      monster.setLifetime = 50;
      
      if (score > 10 )
        {
         monster.velocityX = -(8+(2*score/10));
        }
      else 
      {
       monster.velocityX = -(8+(score/10));
      }
      
      enemyGroup.add(monster);
    }
}