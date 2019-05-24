class character{
 constructor(id){
        this.input={speed:1,life:5,spaw_x:0,spaw_y:0,spaw_name:"wall.png"}
     this.my=scene.object[id]
 }    
    
 start(){

 }
 loop(){
 var list_object=scene.explorer.list_object
 if(parseInt(this.input.life)!=0){
 if(this.my.collision.id.length!=0){
    this.input.life=parseInt(this.input.life)-1
    scene.add_object(this.list_object[this.input.spaw_name],{x:this.input.spaw_x,y:this.input.spaw_y})
    if(find(this.my.collision.direction,"left"))this.my.move(10,0)
        else
           if(find(this.my.collision.direction,"right"))this.my.move(-10,0)
    if(find(this.my.collision.direction,"up"))this.my.move(0,10)
        else
           if(find(this.my.collision.direction,"right"))this.my.move(0,-10)
 }
 switch(key){
  case "left":
        if(!find(this.my.collision.direction,"left"))
            this.my.move(-parseFloat(this.input.speed),0)
        break;
  case "right":
        if(!find(this.my.collision.direction,"right"))
            this.my.move(parseFloat(this.input.speed),0)
        break;
  case "up":
        if(!find(this.my.collision.direction,"up"))
            this.my.move(0,-parseFloat(this.input.speed))
        break;
  case "down":
        if(!find(this.my.collision.direction,"down"))
            this.my.move(0,parseFloat(this.input.speed))
        break;
 
 }
 }else{
     this.my.status="dead"
     this.my.property.visible=false
     this.my.property.type="ghost"
 }
}
}
function find(array,value){
    for(var id in array){
        if(array[id]==value){
            return true        
        }
    }return false
}
