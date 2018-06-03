class Hero{
    constructor(){
        this.animation_index = 0;
        this.animation_max = 11;
        this.running_frame_change_every = 3;
        this.jumping_frame_change_every = 8;
        this.change_frame_every = this.running_frame_change_every;
        this.animation_list = this.create_running_array();
        
        this.x = 35;
        this.y = Canvas_Height - 190;
        this.y_standard = Canvas_Height - 190;
        
        this.y_vel = 0;
        this.gravity = 0.5;
        this.jump_vel = 7;
        this.jump_budge = 15;
        
        this.jump_count = 0;
        this.max_jumps = 2;
    }
    
    create_running_array(){
        let prefix = 'assets/hero/run-cycle-inked2_xcf-Frame_';
        let suffix = '__100ms___replace_.png';
        let images = [];
        
        for(let i = 1; i < this.animation_max + 2; i++){
            if(i < 10){
                images.push( loadImage(prefix + '0' + i + suffix) )
            } else {
                images.push( loadImage(prefix + i + suffix)  )
            }
        }
        
        return images;
    }
    
    update(){
        if(this.y < this.y_standard){
            this.y -= this.y_vel;
            this.y_vel -= this.gravity;
            this.change_frame_every = this.jumping_frame_change_every;
        } else if (this.y >= this.y_standard){
            this.y = this.y_standard;
            this.y_vel = 0;
            this.jump_count = 0;
            this.change_frame_every = this.running_frame_change_every;
            
        }
    }
    
    jump(){
        if(this.jump_count < this.max_jumps){
            this.jump_count++;
            this.y -= this.jump_budge;
            this.y_vel += this.jump_vel;
        }
        
    }
    
    choose_animation_index(frame){
        //there are 0 - 11 frames (12 total)
        if(frame % this.change_frame_every == 0){
            if(this.animation_index <= this.animation_max - 1){
                this.animation_index++;
            } else {
                this.animation_index = 0;
            }
        }
    }
    
    display(){
        //display an image based on what animation frame
        image(this.animation_list[this.animation_index], 
              this.x, this.y,
             175, 175); //resizes the image
    }
    
    run(frame){
        this.choose_animation_index(frame);
        this.display();
        this.update();
    }
    
}