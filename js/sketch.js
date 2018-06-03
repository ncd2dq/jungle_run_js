let Canvas_Width =  768;
let Canvas_Height = 432;

let current_score = 0;

let backgroundObject;
let heroObject;
let coin_list = [];
let obstacle_list = [];

let global_y_offset = 0;

let background_sound;
let coin_sound;
let running_sound;
let powerup_sound_intro;
let powerup_sound;
let powerupintro = true;

// normal sounds
let run_speed_sound = 1.09;
let normal = true;
// end normal sounds
// power up stuff
let run_speed_powerup = 2.5;
let powerup_visual;
let powerupspeed = 10;
// end power up

function preload(){
    soundFormats('mp3');
    background_sound = loadSound("assets/soundtrack/background_nofade.mp3");
    background_sound.setVolume(0.6);
    running_sound = loadSound("assets/soundtrack/running_effect.mp3");
    running_sound.setVolume(1);
    running_sound.rate(run_speed_sound);
    coin_sound = loadSound("assets/soundtrack/coin_effect.mp3");
    coin_sound.setVolume(0.3);
    //Power up stuff
    powerup_sound_intro = loadSound("assets/soundtrack/powerup_with_intro.mp3");
    powerup_sound = loadSound("assets/soundtrack/powerup_repeat.mp3");
}

function setup() {
    let canvas = createCanvas(Canvas_Width, Canvas_Height);
    canvas.parent('sketch-holder');
    backgroundObject = new backgroundParralax();
    heroObject = new Hero();
    powerup_visual = loadImage('assets/powerup/harambe.jpg');
    
    let coin_speed = backgroundObject.speed * (1 + backgroundObject.speed_reduction);
    let temp_speed = backgroundObject.floor_bottom_speed;
    coin_list.push(new goldCoin(250, 0));
    obstacle_list.push(new Obstacle(120 + 150, Canvas_Height - 200, temp_speed));
    obstacle_list.push(new Obstacle(220 + 150, Canvas_Height - 300, temp_speed));
    obstacle_list.push(new Obstacle(320 + 150, Canvas_Height - 400, temp_speed));
    obstacle_list.push(new Obstacle(420 + 150, Canvas_Height - 500, temp_speed));
    obstacle_list.push(new Obstacle(520 + 150, Canvas_Height - 600, temp_speed));
    
    obstacle_list.push(new Obstacle(120 + 150 + 400, Canvas_Height - 200, temp_speed));
    obstacle_list.push(new Obstacle(220 + 150 + 400, Canvas_Height - 300, temp_speed));
    obstacle_list.push(new Obstacle(320 + 150 + 400, Canvas_Height - 400, temp_speed));
    obstacle_list.push(new Obstacle(420 + 150 + 400, Canvas_Height - 500, temp_speed));
    obstacle_list.push(new Obstacle(520 + 150 + 400, Canvas_Height - 600, temp_speed));
    
    if(background_sound.isLoaded() == true){
        background_sound.loop();
    }
    
    if(running_sound.isLoaded() == true){
        console.log("running sound loaded");
    }
    
    if(coin_sound.isLoaded() == true){
        console.log('coin sound loaded');
        coin_sound.play();
    }
}


function draw() {
    if(normal && background_sound.isPlaying() == false){
        powerup_sound_intro.stop();
        powerup_sound.stop();
        background_sound.loop();
    } else if(!normal && powerupintro && powerup_sound_intro.isPlaying() == false){
        background_sound.stop();
        powerup_sound_intro.play();
        powerupintro = false;
    } else if(!normal && !powerupintro && powerup_sound_intro.isPlaying() == false && powerup_sound.isPlaying() == false){
        background_sound.stop();
        powerup_sound.loop();
    }
    
    backgroundObject.run();
    
    //test object loop
    for(let i = 0; i < obstacle_list.length; i++){
        if(obstacle_list[i].x < 0){
            obstacle_list[i].x = Canvas_Width;
        }
    }
    //end test loop
    
    for(let i = 0; i < coin_list.length; i++){
        coin_list[i].run(frameCount);
    }

    for(let i = 0; i < obstacle_list.length; i++){
        obstacle_list[i].run();
    }
    if(!normal && frameCount % 5 == 0){
        background(random(255), random(255), random(255), 255);
    }
    
    heroObject.run(frameCount, obstacle_list);

    display_game_data();
    
    //power up effect
}

//Javascript HTML interface
function display_game_data(){    
    let scoreElement = document.getElementById("score_dom");
    scoreElement.innerHTML = "Score: " + current_score;
}

// User input
function keyPressed(){
    if (keyCode === LEFT_ARROW){
        //direction = [-1, 0];
        theta_change = -5;
        
    } else if (keyCode === RIGHT_ARROW){
        //direction = [1, 0];  
        theta_change = 5;
        
    } else if (keyCode === DOWN_ARROW){
        ship.boosting = true;
        ship.forward = true;
        
    } else if (keyCode === UP_ARROW){
        ship.boosting = true;
        ship.forward = false;
        
    } else if (keyCode == 32){ //the spacebar
        heroObject.jump();
    } else if (keyCode == 80){ //the 'p' key

    } else if(keyCode = 66){ //the 'b' key for powerup mode
        if(normal){
            normal = false;
        } else {
            normal = true;
            powerupintro = true;
        }
    }
}

function powerup(){
    if(normal){
        normal = false;
    } else {
        normal = true;
        powerupintro = true;
    }
}

function mousePressed(){
    heroObject.jump();
}

//collect coins
function collect_coins(hero_class, coins){
    for(let i = 0; i < coins.length; i++){
        if(hero_class.x){
            
        }
    }
}

//
//        //find hit box
//        fill(255, 0, 0);
//        ellipse(this.x + 175 / 3, this.y + this.resized_y * 4 / 5, 5, 5);
//        ellipse(this.x + 175 * 1.75 / 3, this.y + this.resized_y * 4 / 5, 5, 5);
//        ellipse(this.x + 175 / 3, this.y + this.resized_y * 1 / 3, 5, 5);
//        ellipse(this.x + 175 * 1.75 / 3, this.y + this.resized_y * 1 / 3, 5, 5);
//
//        //find hit box
//        fill(255, 0, 0);
//        ellipse(this.x + this.resized_x / 3, this.y + this.resized_y * 4 / 5, 5, 5);
//        ellipse(this.x + this.resized_x * 1.75 / 3, this.y + this.resized_y * 4 / 5, 5, 5);
//        ellipse(this.x + this.resized_x / 3, this.y + this.resized_y * 1 / 3, 5, 5);
//        ellipse(this.x + this.resized_x * 1.75 / 3, this.y + this.resized_y * 1 / 3, 5, 5);