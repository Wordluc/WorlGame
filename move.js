class move{
 constructor(){
        this.input={speed:1}
        this.d=1
        
 }
 start(){
        
 }
 loop(my,system,collision,other){
     var x=my.property.x
     console.log(my.propertycollision)    
     if(x<0){
           this.d=1
     }
     if(x>500)
           this.d=0
     if(find(collision.direction,"left"))this.d=1
     if(find(collision.direction,"right"))this.d=0
     if(this.d==1){
         my.property.x=parseFloat(my.property.x)+parseFloat(this.input.speed)
     }else if(this.d==0)
         my.property.x=parseFloat(my.property.x)-parseFloat(this.input.speed)
 }

}
function find(array,value){
    for(var id in array){
        if(array[id]==value){
            return true        
        }
    }return false
}
