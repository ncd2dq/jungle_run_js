class goldCoin{
    constructor(x, y, speed){
        
        this.animation_index = 0;
        this.animation_max = 5;
        this.change_frame_every = 6;
        this.animation_list = this.create_coin_array();
        
        this.x = x;
        this.y = y;
        
        this.resized_x = 50;
        this.resized_y = 50;
        
        this.collected = false;
        
        this.speed = speed;
    }
    
    create_coin_array(){
        let prefix = 'assets/goldcoins/Coin';
        let suffix = '.png';
        let images = [];
        
        for(let i = 1; i < this.animation_max + 2; i++){
            images.push( loadImage(prefix + i + suffix) );
        }
        
        return images;
    }
    
    choose_animation_index(frame){
        if(frame % this.change_frame_every == 0){
            if(this.animation_index <= this.animation_max - 1){
                this.animation_index++;
            } else {
                this.animation_index = 0;
            }
        }
    }
    
    update(){
        this.x -= this.speed;
    }
    
    display(){
        image(this.animation_list[this.animation_index],
              this.x, this.y + global_y_offset,
             this.resized_x, this.resized_y);

/*        //find hit box
        fill(255, 0, 0);
        ellipse(this.x + this.resized_x / 3, global_y_offset + this.y + this.resized_y * 4 / 5, 5, 5);
        ellipse(this.x + this.resized_x * 2 / 3, global_y_offset + this.y + this.resized_y * 4 / 5, 5, 5);
        ellipse(this.x + this.resized_x / 3, global_y_offset + this.y + this.resized_y * 1 / 5, 5, 5);
        ellipse(this.x + this.resized_x * 2 / 3, global_y_offset + this.y + this.resized_y * 1 / 5, 5, 5);*/
    }
    
    run(frame){
        this.choose_animation_index(frame);
        this.update();
        this.display();
    }
}