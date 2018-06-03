let Canvas_Width =  768;
let Canvas_Height = 432;

let current_score = 0;

let backgroundObject;
let heroObject;
let coin_list = [];
let obstacle_list = [];

let global_y_offset = 0;

function setup() {
    let canvas = createCanvas(Canvas_Width, Canvas_Height);
    canvas.parent('sketch-holder');
    backgroundObject = new backgroundParralax();
    heroObject = new Hero();
    
    let coin_speed = backgroundObject.speed * (1 + backgroundObject.speed_reduction);
    
    coin_list.push(new goldCoin(250, 0));
    obstacle_list.push(new Obstacle(120, Canvas_Height - 200, 0));
    obstacle_list.push(new Obstacle(120, Canvas_Height - 300, 0));
    obstacle_list.push(new Obstacle(120, Canvas_Height - 400, 0));
    obstacle_list.push(new Obstacle(120, Canvas_Height - 500, 0));
    obstacle_list.push(new Obstacle(120, Canvas_Height - 600, 0));
}


function draw() {        
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
    
    heroObject.run(frameCount, obstacle_list);

    display_game_data();
 
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