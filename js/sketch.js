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

let hero_max_health = 5;
let hero_health = 5;
let health_bar_scale = 50;

let ground_floor_speed;

let generator;

// normal sounds
let run_speed_sound = 1.09;
let normal = true;
// end normal sounds
// power up stuff
let run_speed_powerup = 2.5;
let powerup_visual;
let powerupspeed = 10;
// end power up
let gState;

function preload(){
    soundFormats('mp3');
    background_sound = loadSound("assets/soundtrack/background_nofade.mp3");
    background_sound.setVolume(0.6);
    running_sound = loadSound("assets/soundtrack/running_effect.mp3");
    running_sound.setVolume(1.5);
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
    ground_floor_speed = backgroundObject.floor_bottom_speed;
    heroObject = new Hero();
    powerup_visual = loadImage('assets/powerup/harambe.jpg');
    gState = new gameState();
    
    if(background_sound.isLoaded() == true){
        background_sound.loop();
    }
    
    if(running_sound.isLoaded() == true){
        console.log("running sound loaded");
    }
    
    if(coin_sound.isLoaded() == true){
        console.log('coin sound loaded');
    }
    generator = new objectGenerator(0.5, //coin rate
                                    0.2, //evil coin rate
                                    0.6, //obstacle_rate
                                    6, //max levels
                                    4, //max consecutive boxes
                                    2, //max skips
                                    0.3); //skip rate
    for(let i = 0; i < 35; i++){
        generator.run(obstacle_list, coin_list);
    }
}


function draw() {
    try{
        
        if(normal && background_sound.isPlaying() == false){
            powerup_sound_intro.stop();
            powerup_sound.stop();
            background_sound.play();
        } else if(!normal && powerupintro && powerup_sound_intro.isPlaying() == false){
            background_sound.stop();
            powerup_sound_intro.play();
            powerupintro = false;
        } else if(!normal && !powerupintro && powerup_sound_intro.isPlaying() == false && powerup_sound.isPlaying() == false){
            powerup_sound.play();
            console.log('repeat');
        }
    } 
    
    catch(err){
        console.log(err);
        powerup_sound_intro.stop();
        powerup_sound.stop();
        background_sound.play();
    }
    
    backgroundObject.run();
    
    
    for(let i = 0; i < coin_list.length; i++){
        coin_list[i].run(frameCount);
    }

    for(let i = 0; i < obstacle_list.length; i++){
        obstacle_list[i].run();
    }
    if(!normal && frameCount % 5 == 0){
        background(random(255), random(255), random(255), 255);
    }
    
    heroObject.run(frameCount, obstacle_list, coin_list);
    remove_coins(coin_list);
    remove_barriers(obstacle_list);

    display_game_data();
    display_health();
    if(gState.paused){
        gState.display_instructions();
    } else if (gState.game_over){
        gState.final_score_screen();
    }
    
    gState.remaining_coins = coin_list.length;
    gState.display_level_stats();
    gState.reset_game();
    
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

    } else if(keyCode == 66){ //the 'b' key for powerup mode
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
function remove_coins(coins){
    for(let i = coins.length - 1; i >= 0; i--){
        if(coins[i].collected){
            if(!coins[i].evil){
                current_score++;
            } else {
                hero_health--;
                if(hero_health == 0){
                    gState.game_over = true;
                }
            }
            coins.splice(i, 1);
            coin_sound.play();
        } else if (coins[i].x + coins[i].resized_x * 2 / 3 < -5){
            coins.splice(i, 1);
        }
    }
}

function remove_barriers(barriers){
    for(let i = barriers.length - 1; i >= 0 ; i--){
        if(barriers[i].x + barriers[i].width < 0){
            barriers.splice(i, 1);
        }
        
    }
}

function display_health(){
    fill(0, 0, 0);
    rect(Canvas_Width / 3, 5, hero_max_health * health_bar_scale, 10);
    fill(0, 255, 0);
    rect(Canvas_Width / 3, 5, hero_health * health_bar_scale, 10);
}

function pause_game(){
    gState.pause();
}
