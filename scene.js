class main_scene{
    constructor(canvas){
        this.canvas=document.getElementById(canvas)
        this.canvas.height=550
        this.canvas.width=550
        this.object={}
        this.n_object=0
        this.scene="developed"
        this.explorer=parent.frames["explorer"].explorer
    }
    transform_position(canvas, evt) {
        var canvas=document.getElementById("canvas1")
        var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

        return {
          x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
          y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    } 
    point(event){
        var coordinate=this.transform_position(this.canvas,event)
        if(this.explorer.reference!="null")//want I add new object?
            this.add_object(this.explorer.reference,coordinate)
        else{//i check object property    
              try{
                let id=this.find_object(coordinate.x,coordinate.y)//it return object that i have aim
                console.log(id)
                if(id!=undefined)
                   parent.frames["property"].property.new_property(this.object[id])//it show property of object aim
              }catch(e){
                    console.log(e.message)
              }
           
        }
    }
    add_object(img,coordinate){//it add new object
       this.n_object+=1
       this.object[this.n_object]=new object(this.n_object,this.canvas,img,coordinate)
       this.object[this.n_object].draw(this.scene)
       parent.frames["property"].property.new_property(this.object[this.n_object])
       this.explorer.change_reference("null")
    }
    changeScene(){
        this.scene=document.getElementById("id_scene").value
        this.redraw(this.scene)
    }
    discover_collisions(){//it is used for descover collision between object 
        var wall={}
        var player={}
        var collision={}
        for(var id in this.object){//it sort object between wall and player  
            var x=0
            var y=0
            collision[id]={id:[],direction:[]}
            switch(this.object[id].property.type){
                case "wall":
                    x=parseFloat(this.object[id].property.x)+parseFloat(this.object[id].property.size_x)/2
                    y=parseFloat(this.object[id].property.y)+parseFloat(this.object[id].property.size_y)/2
                    wall[id]={x:x,y:y,size:{x:parseFloat(this.object[id].property.size_x),y:parseFloat(this.object[id].property.size_y)}}
                    break
                case "player":
                  x=parseFloat(this.object[id].property.x)+parseFloat(this.object[id].property.size_x)/2
                  y=parseFloat(this.object[id].property.y)+parseFloat(this.object[id].property.size_y)/2
                  player[id]={x:x,y:y,size:{x:parseFloat(this.object[id].property.size_x),y:parseFloat(this.object[id].property.size_y)}}
                  wall[id]={x:x,y:y,size:{x:parseFloat(this.object[id].property.size_x),y:parseFloat(this.object[id].property.size_y)}}
                  break
            }
        }
        for(var id_p in player){
            for(var id_w in wall){
                if(id_p != id_w){//it fix error caused of player
                    let y=(player[id_p].y-wall[id_w].y)//it calculates distance between y_player and y_wall 
                    let x=(player[id_p].x-wall[id_w].x)//it calculates distance between x_player and x_wall 
                    let distX=player[id_p].size.x/2+wall[id_w].size.x/2
                    let distY=player[id_p].size.y/2+wall[id_w].size.y/2
                    if(Math.sqrt(x**2)<distX && Math.sqrt(y**2)<distY){//it detection the collision
                        if(x<0){//right
                            collision[id_p].id.push(id_w)
                            collision[id_p].direction.push("right")
                        }else if(x>0){//left
                            collision[id_p].id.push(id_w)
                            collision[id_p].direction.push("left")
                        }if(y<0){//down
                            collision[id_p].id.push(id_w)
                            collision[id_p].direction.push("down")
                        }else if(y>0){//up
                            collision[id_p].id.push(id_w)
                            collision[id_p].direction.push("up")
                        }
                    }    
                }
            }
        }
        return collision
    }
    find_object(x,y){//it find the object that i have aim
        for(var id in this.object){
            if(this.object[id].detection_mouse(x,y)){
                return id
            }
        }
    }
    redraw(scene){//it redraw all scene
         this.canvas.getContext("2d").clearRect(0,0,600,600)
         for(var names of Object.keys(this.object)){
              this.object[names].draw(scene)
         }
    }
    loop_control(){
        this.explorer.change_reference("null")
        var controler=document.getElementById("id_switch")//it allow control switch between scene and test
        document.getElementById("id_scene").selectedIndex=1
        this.changeScene()
        if(controler.innerHTML=="start"){
            this.begin={}//it is the backup of everyone object property 
            for (let id in this.object){
                      this.begin[id]=[Object.assign({},this.object[id].property),Object.assign({},this.object[id].script.input)]//it perform the backup property(main scene)
                try{//it perform function start if it exists
                      this.object[id].script.start()
                 }catch(unused){}
                //this.object[id].draw()
             }             
             controler.innerHTML="stop"
             this.loop() 
        }else{
            for (let id in this.object){
               try{//it reload main scene
                      this.object[id].reload(this.begin[id][0],this.begin[id][1])
                      this.redraw(scene)
               }catch(e){
                   this.n_object-=1
                   delete this.object[id]
               }
            }
            controler.innerHTML="start"
        }
    }
    loop(){//it perform script of everyone object
        var collision=this.discover_collisions()
        for (var id in this.object){
                this.object[id].collision=collision[id]
                this.object[id].loop()
        }
        this.redraw(this.scene)//it show changes
        if(document.getElementById("id_switch").innerHTML=="stop")
             setTimeout(this.loop.bind(this),10)
    }
    change_property(property,input_script,old_id){
        if(property!="delete"){//it control if it must autodelete
        var object=this.object[old_id]
        delete this.object[old_id]
        this.object[property.name]=object
                   console.log(input_script)
        this.object[property.name].reload(property,input_script)
        }else{//it is delete
            delete this.object[old_id]
            this.n_object-=1
        }
        this.redraw(this.scene)
    }
}
