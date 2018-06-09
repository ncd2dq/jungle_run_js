//pause functionality

//instructions
//collect these, avoid these
//space bar, click mouse, or tap screen to jump

//game over
class gameState{
    constructor(){
        this.instruction1 = "Collect these coins:";
        this.instruction2 = "Avoid these coins:";
        this.good_coin = loadImage('assets/goldcoins/Coin1.png');
        this.bad_coin = loadImage('assets/goldcoins/eCoin1.png');
        
        this.level = 1;
        this.remaining_coins = 0;
        
        this.instruction3 = "Press 'space bar', click your mouse, or tap the screen to jump";
        this.paused = false;
        this.game_over = false;
        this.fell = false;
    }
    
    display_level_stats(){
        textSize(15);
        fill(0, 255, 0);
        text("Level: " + this.level, 10, 15);
        text("Remaining Coins: " + this.remaining_coins, 88, 15)
    }
    
    reset(){
        generator = new objectGenerator(0.5, //coin rate
                                    0.2, //evil coin rate
                                    0.6, //obstacle_rate
                                    6, //max levels
                                    4, //max consecutive boxes
                                    2, //max skips
                                    0.3, //skip rate
                                   [0.3, 0.2, 0.5]); //elevation down, same, up rate
        for(let i = 0; i < course_length; i++){
            generator.run(obstacle_list, coin_list);
        }
        generator.finish_generation(obstacle_list);
        
        hero_health = 5;

        loop();
        
    }
    
    reset_game(){
        if(obstacle_list.length == 0 && coin_list.length == 0){
            noLoop();
            normal = true;
            powerupintro = true;
            this.level++;
            try{
                running_sound.stop();
                powerup_sound_intro.stop();
                powerup_sound.stop();
                if(background_sound.isPlaying() == false){
                    background_sound.loop();
                }
            }
            catch(err){
                console.log(err);
            }
            
            
            setTimeout(this.reset, 3000)
            background(0, 0, 0, 175);
            textSize(15);
            fill(0, 255, 0);
            text("Next Level!", Canvas_Width / 3 - 75, Canvas_Height / 2 - 70);
        }
    }

    display_instructions(){
        background(0, 0, 0, 175);
        textSize(15);
        fill(0, 255, 0);
        text(this.instruction1, Canvas_Width / 3 - 75, Canvas_Height / 2 - 70);
        image(this.good_coin, Canvas_Width / 3 - 75 + 140, Canvas_Height / 2 - 88);
        text(this.instruction2, Canvas_Width / 3 - 75, Canvas_Height / 2 + 0);
        image(this.bad_coin, Canvas_Width / 3 - 75 + 130, Canvas_Height / 2 - 20)
        text(this.instruction3, Canvas_Width / 3 - 75, Canvas_Height / 2 + 70);    
    }
    
    final_score_screen(){
        running_sound.stop();
        noLoop();
        this.game_over = true;
        background(0, 0, 0, 175);
        textSize(15);
        fill(0, 255, 0);
        text("Your Final Score Was: " + current_score, Canvas_Width / 3 - 75, Canvas_Height / 2 - 70);
        if(this.fell){
            fill(255);
            text("You Fell To Your Death", Canvas_Width / 3 - 75, Canvas_Height / 2 + 0);
        }
        setTimeout(function(){location.reload();}, 3000);
    }
    
    pause(){
        if(this.paused){
            loop();
            this.paused = false;
        } else {
            noLoop();
            this.paused = true;
        }
    } 
}

