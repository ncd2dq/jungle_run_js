class Hero{
    constructor(){
        this.animation_index = 0;
        this.animation_max = 11;
        this.running_frame_change_every = 3;
        this.jumping_frame_change_every = 8;
        //power up 
        this.power_up_change_frame_every = 1;
        this.dank_glass = loadImage('assets/hero/dankglass.png');
        //end power up
        this.change_frame_every = this.running_frame_change_every;
        this.animation_list = this.create_running_array();
        
        
        
/*        this.x = 35;
        this.y = Canvas_Height - 190;*/
        
        this.x = 100;
        this.y = Canvas_Height / 4;
        
        
        this.y_standard = Canvas_Height - 190;
        
        this.y_vel = 0;
        this.gravity = 0.5;
        this.max_downward = -12;
        this.jump_vel = 7;
        this.jump_budge = 15;
        
        this.jump_count = 0;
        this.max_jumps = 2;
        
        this.resized_x = 175;
        this.resized_y = 175;
        
        this.possible_surfaces = [];
        
        this.above_zone = false;
        this.fixed_y = Canvas_Height / 3 - (this.resized_y / 4);
        this.fix_y_for_obstacles = 58;
        
        //new position when in above zone
        //this.fixed_y and this.fixed_y + (this.resized_y * 5/ 6) - this.fix_y_for_obstacles
        //everything else is the same
    }
    
    create_running_array(){
        let prefix = 'assets/hero/run-cycle-inked2_xcf-Frame_';
        let suffix = '__100ms___replace_.png';
        let images = [];
        
        for(let i = 1; i < this.animation_max + 2; i++){
            if(i < 10){
                images.push( loadImage(prefix + '0' + i + suffix) );
            } else {
                images.push( loadImage(prefix + i + suffix)  );
            }
        }
        
        return images;
    }
    
    stand_on(objs){
        this.possible_surfaces = [];
        for(let i = 0; i < objs.length; i++){
            if(this.x + this.resized_x / 3 >= objs[i].x + objs[i].image_blank_space &&
               this.x + this.resized_x / 3 <= objs[i].x - objs[i].image_blank_space + objs[i].resized_x &&
              this.y + this.resized_y * 5 / 6 <= objs[i].y + objs[i].image_blank_space){
                this.possible_surfaces.push(objs[i].y_standard);

            } else if(this.x + this.resized_x * 1.75 / 3 >= objs[i].x + objs[i].image_blank_space &&
               this.x + this.resized_x * 1.75 / 3 <= objs[i].x - objs[i].image_blank_space + objs[i].resized_x &&
                this.y + this.resized_y * 5 / 6 <= objs[i].y + objs[i].image_blank_space){
                this.possible_surfaces.push(objs[i].y_standard);
            }

            
        }
        if(this.possible_surfaces.length == 0){ // if he is above no other objects, change the floor back to the ground level
                this.y_standard = backgroundObject.y_standard;
            } else { //if he is above other objects, change the floor to the highest of the objects he is above
                let highest = Canvas_Height;
                for(let j = 0; j < this.possible_surfaces.length; j++){
                    if(this.possible_surfaces[j] < highest){
                        highest = this.possible_surfaces[j];
                    }
                }
                this.y_standard = highest;
            }
    }
    
    display_dank(){
        if(!this.above_zone){
            let current_image = this.animation_list[this.animation_index];
            image(this.dank_glass, 
                  this.x + (this.resized_x * 1 / 3 + 5), this.y + (this.resized_y * 1 / 4 + 2),
                 35, 15); //resizes the image
        } else {
            let current_image = this.animation_list[this.animation_index];
            image(this.dank_glass, 
                  this.x + (this.resized_x * 1 / 3 + 5), this.fixed_y - this.fix_y_for_obstacles + (this.resized_y * 1 / 4 + 2),
                 35, 15); //resizes the image
        }
    }
    
    update(){
        //THIS IS WHERE THE MAGIC OF UNLIMITED UPWARD MOVEMENT COMES FROM
        
        //If your y position would go higher than a set limit on the screen, create a global_y_offset of how much higher you are relative to that fixed
        //y point. Now, instead of moving the character, move all other objects downward by that much to show relative motion
        
        let top_left_actual = this.y + this.resized_y * 1 / 3; // find real y position of hero
        if(top_left_actual <= this.fixed_y){ //compare it to the fixed position on screen
            global_y_offset = this.fixed_y - (top_left_actual); //find the difference to apply to all objects when drawn
            this.above_zone = true;
        } else {   
            global_y_offset = 0;
            this.above_zone = false;
        }
            
        if(this.y - this.y_vel < this.y_standard){ //when above the current floor, allow him to keep falling
            this.y -= this.y_vel;
            if(this.y_vel > this.max_downward){
                this.y_vel -= this.gravity;
            }
            this.change_frame_every = this.jumping_frame_change_every;
            if(running_sound.isPlaying() == true){
                running_sound.stop();
            }
            
        } else if (this.y - this.y_vel > this.y_standard){
            this.y = this.y_standard;
            this.y_vel = 0;
            this.jump_count = 0;
            if(normal){ //if powerup is running go into frantic mode
                this.change_frame_every = this.running_frame_change_every;
            } else if (!normal){
                this.change_frame_every = this.power_up_change_frame_every;
            }
            if(running_sound.isPlaying() == false){
                running_sound.play();
            }
        } else if (this.y >= this.y_standard){
            this.y = this.y_standard;
            this.y_vel = 0;
            this.jump_count = 0;
            if(normal){ //if powerup is running go into frantic mode
                this.change_frame_every = this.running_frame_change_every;
            } else if (!normal){
                this.change_frame_every = this.power_up_change_frame_every;
            }
            if(running_sound.isPlaying() == false){
                running_sound.play();
            }
            
        } else {
            if(running_sound.isPlaying() == false){
                running_sound.play();
            }
        }
        
    }
    
    jump(){
        if(this.jump_count < this.max_jumps && this.jump_count == 0){
            this.jump_count++;
            this.y -= this.jump_budge;
            this.y_vel += this.jump_vel;
        } else if(this.jump_count == 1){
            this.y_vel = 0;
            this.y -= this.jump_budge * 1.5;
            this.y_vel += this.jump_vel * 1.3;
            this.jump_count++;
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
        if(!this.above_zone){
            let current_image = this.animation_list[this.animation_index];
            image(current_image, 
                  this.x, this.y,
                 this.resized_x, this.resized_y); //resizes the image
        } else {
            let current_image = this.animation_list[this.animation_index];
            image(current_image, 
                  this.x, this.fixed_y - this.fix_y_for_obstacles,
                 this.resized_x, this.resized_y); //resizes the image
        }
        
        ellipse(this.x + 175/3, this.fixed_y, 5,5);
        
        //find hit box
        fill(255,255,0);
        if(this.above_zone){
            ellipse(this.x + 175/3, this.fixed_y + (this.resized_y * 5/ 6) - this.fix_y_for_obstacles, 5, 5); // bottom left
            ellipse(this.x + 175 * 1.75 / 3, this.fixed_y + (this.resized_y * 5/ 6) - this.fix_y_for_obstacles, 5, 5); //bottom right
            ellipse(this.x + 175 / 3, this.fixed_y, 5, 5); // top left
            ellipse(this.x + 175 * 1.75 / 3, this.fixed_y, 5, 5); //top right
        } else if(!this.above_zone){
            fill(255, 0, 0);
            ellipse(this.x + 175 / 3, this.y + this.resized_y * 5 / 6, 5, 5); // bottom left
            ellipse(this.x + 175 * 1.75 / 3, this.y + this.resized_y * 5 / 6, 5, 5); //bottom right
            ellipse(this.x + 175 / 3, this.y + this.resized_y * 1 / 3, 5, 5); // top left
            ellipse(this.x + 175 * 1.75 / 3, this.y + this.resized_y * 1 / 3, 5, 5); //top right
        }
    }
    
    run(frame, objs){
        this.update();
        this.choose_animation_index(frame);
        this.display();
        if(!normal){
            this.display_dank();
        }
        this.stand_on(objs);
    }
    
}