import kaboom from "kaboom";

// initialize context
kaboom({
  width: 1024,
  height: 768,
  streth: true,
  letterbox: true,
});

const WIDTH = 1024;
const HEIGHT = 768;
// load assets
loadSprite("flappy", "sprites/flappy.png");
loadSprite("bg", "sprites/bg.png");

scene("main", () => {
  const JUMP_FORCE = 800;
const PIPE_OPEN = 240;
const PIPE_MIN = 60;
const SPEED = 320;
const CEILING= -55;
  layers(["bg", "obj", "ui"], "obj");

  gravity(3200)

const flappy = add([
	// list of components
	sprite("flappy"),
	pos(80, 40),
  pos(WIDTH /4,0),
	area(),
  body(),
]);

add([
sprite("bg"),
pos(0,0),
layer("bg"),
])

mouseClick(() =>{
  flappy.jump(JUMP_FORCE);
})

flappy.action(() => {
  if (flappy.pos.y >= HEIGHT ||flappy.pos.y<= CEILING){
    go("Lose");
  }
})

function spawnPipe() {
  let h1 = rand(PIPE_MIN, HEIGHT - PIPE_MIN - PIPE_OPEN);

  let h2 = HEIGHT - h1 - PIPE_OPEN;

  add([
    pos(WIDTH , 0),
    rect(64, h1),
    color(111, 187, 49),
    area(),
    outline(4),
    move(LEFT, SPEED),
    cleanup(),
    "pipe",
  ])

   add([
    pos(WIDTH , h1 + PIPE_OPEN ),
    rect(64, h2),
    color(111, 187, 49),
    area(),
    outline(4),
    move(LEFT, SPEED),
    cleanup(),
    "pipe",
  ])

}

loop(1, ()=> {
spawnPipe();
})

flappy.collides("pipe", ()=> {
go("lose");
})

})

scene("lose", () => {
  add([
    sprite ("bg"),
    pos(0, 0),

  ])
go("main");