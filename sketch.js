var database
var foodS
var dog
var dogImg
var dogImg1

function preload()
{
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database()
  createCanvas(500, 500);
  
  dog = createSprite(250,300,150,150)
  dog.addImage(dogImg);
  dog.scale = 0.15
  
  var foodRef = database.ref("Food")
  foodRef.on("value", readStock)
}


function draw() {  
  background("green")

  if (keyWentDown(UP_ARROW)){
    updateStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  //add styles here
  fill("black")
  text("Food Remaining: " + foodS, 170, 220)
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 130, 20)

}

function readStock(data){
  foodS = data.val();
}

function updateStock(x){
  if (x <= 0){
    x = 0
  }
  else {
    x = x - 1
  }
  database.ref("/").update({
    Food: x
  })
}

