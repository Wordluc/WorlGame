class object{
    constructor(name,canvas,image,coordinate,script){
        this.canvas=canvas
        this.canvas=this.canvas.getContext("2d")
        this.property={name:name,size_x:50,size_y:50,x:coordinate.x-25,y:coordinate.y-25,n_script:"",type:"wall",visible:true}
        this.script=""
        this.status="go"
        this.image=image
    }
    reload(property,input_script){//it manages the changes of value in property and script input 
        this.script=""
        delete this.property
        this.property=property
        try{
            this.script=eval("new "+property.n_script+"(property.name)")
            if(input_script!=undefined){
                   console.log(input_script)
               for( var id in this.script.input){
                
                   this.script.input[id]=input_script[id]
               }
            }
        }catch(e){
            this.script=""
        }
    }
    loop(){
        if(this.status!="stop" && this.script!=""){
            
               this.script.loop()
   
        }
    }
    draw(scene){ 
        if((scene=="game" && this.property.visible==true)||(scene=="developed")){
           var sizeX=this.property.size_x/2
           var sizeY=this.property.size_y/2
           this.canvas.drawImage(this.image,this.property.x,this.property.y,this.property.size_x,this.property.size_y)
        }
    }
    move(at_x,at_y){
        this.property.x=parseFloat(this.property.x)+at_x
        this.property.y=parseFloat(this.property.y)+at_y
    }
    detection_mouse(x,y){//it return true if mouse targets this object 
        if(x>=this.property.x && x<=parseFloat(this.property.x)+parseFloat(this.property.size_x))
                 if(y>=this.property.y && y<=parseFloat(this.property.y)+parseFloat(this.property.size_y))
                          return true
        return false
    }
}
var key={}
window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      key="left"
    break;
    case 38: // Up
      key="up"
    break;
    case 39: // Right
      key="right"
    break;
    case 40:
      key="down"
      break
    case 27:
      key="esc"
  }
}, false);
window.addEventListener('keyup', function(event) {
    key="stop"
})