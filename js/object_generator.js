class objectGenerator{
    constructor(coin_rate, obstacle_rate, max_levels, max_consecutive, max_skip, skip_rate){
        this.coin_rate = coin_rate;
        this.obstacle_rate = obstacle_rate;
        this.skip_rate = skip_rate;
        
        this.max_levels = max_levels;
        this.max_consecutive = max_consecutive;
        this.max_skip = max_skip;
        
        this.current_block_num = 0;
        this.current_level = 0;
        
        //block stats
        this.length = 92.5;
        this.width = 93.75;
        
        //coin stats
        this.coin_min_y = 50;
        this.coin_min_x = 75;
    }
    
    //need to figure out what pixels are on screen so that it only generates the next set of barries and not off into infinity
    
    create_obstacle(current_obstacle_list, current_coins_list){
        let skipping = random();
        let amount_skipping = Math.round(random(0, this.max_skip));
        
        let amount_in_row = Math.round(random(1, this.max_consecutive));
        let up_or_down = Math.round(random(-1, 1)); //-1 down, 0 same, 1 up
        
        //create skip blocks
        if(skipping < this.skip_rate){
            for(let i = 0; i < amount_skipping; i++){
                this.current_block_num++;    
            }
        }
        
        for(let i = 0; i < amount_in_row; i++){
            //push an obstacle
            current_obstacle_list.push(new Obstacle(this.current_block_num * this.width, 290 - (this.length * this.current_level), 5))
            this.current_block_num++;
            
            //push a coin
            if(random() < this.coin_rate){
                current_coins_list.push(new goldCoin(this.current_block_num * this.width - this.coin_min_x, 290 - (this.length * this.current_level) - this.coin_min_y, 5))
            }
        }
        
        //move object creator up, down, or stay the same
        if(up_or_down == -1 && this.current_level != 0){
            this.current_level--;
        } else if (up_or_down == 1 && this.current_level < this.max_levels){
            this.current_level++;
        }
        
    }
    
    create_gold_coin(current_coins_list){
        
    }
    
    run(current_obstacle_list, current_coin_list){
        this.create_obstacle(current_obstacle_list, current_coin_list);
    }
    
    
}


/*

obstacle class is 
this.length = 92.5;
this.width = 93.75;

level 0 = y = 290

*/


/*
class goldCoin{
    constructor(x, speed){
        positive speed*/

/*
class Obstacle{
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        
        this.self_image = loadImage('assets/obstacles/obstacle_block1.png');
        
        this.resized_x = 100;
        this.resized_y = 100;
        this.image_blank_space = 5;
        
        this.y_standard = y + this.image_blank_space - 155; //the line that can be stood on
        
        this.speed = speed;
    }*/


//make coins fall from the sky if !normal