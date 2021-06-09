//Create variables here
var database;
var dog, happyDog,dogimg;
var foodS, foodStock;
var bg;

function preload()
{
	//load images here
  dogimg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
  bg = loadImage("images/bg.png")
  
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  foodStock = database.ref('food')
  foodStock.on('value',readStock)

  dog = createSprite(250,180,30,30)
  dog.addImage(dogimg)
  dog.scale = 0.28

}


function draw() {  
  background(bg)
  
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)


var timer = 3;
    if (frameCount % 60 == 0 && timer > 0) { 
      timer --;
    }
    if(timer === 0){
      dog.addImage(dogimg)
    }
  }

  // if(keyWentDown(SPACE_KEY)){
  //   database.ref("/").update({
  //     'food':20
  //   })
  // }

  // Text start from here
  fill(1)
  text("Note: "+"Press 'UP_arrow' to feed your pet",150,20)
  text("Food: "+foodS,200,60)

}

// Other function 

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if(x<=0){
  x = 0
} else{
  x = x-1
}

  database.ref("/").update({
    'food':x
  })

}


