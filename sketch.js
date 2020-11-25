var doggo
var dog
var happyDog
var database
var foodS
var foodStock

function preload(){
   dog = loadImage("Images/dogImg.png");
   happyDog = loadImage("Images/dogImg1.png");
  }

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  doggo = createSprite(250,300,150,150);
  doggo.addImage(dog);
  doggo.scale=0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    doggo.addImage(happyDog);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press Up Arrow Key to feed Milk",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}